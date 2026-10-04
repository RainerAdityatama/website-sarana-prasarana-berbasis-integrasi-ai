import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI, SchemaType } from "npm:@google/generative-ai";

// Konfigurasi CORS agar bisa dipanggil dari frontend (React)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

// Fungsi untuk membersihkan dan membatasi input pengguna
// Mencegah Token Drain dan Prompt Injection tingkat dasar.
function validateAndSanitizeInput(input: string, fieldName: string, maxLength: number): string {
  if (!input || typeof input !== 'string') {
    throw new Error(`${fieldName} wajib diisi dengan teks yang valid`);
  }

  // Hapus spasi berlebih dan enter berulang (Normalisasi)
  // membantu menghemat token karena spasi berlebih juga dihitung sebagai token oleh ai
  const sanitized = input.trim().replace(/\s+/g, ' ');

  if (sanitized.length > maxLength) {
    throw new Error(`${fieldName} terlalu panjang. Maksimal ${maxLength} karakter. (Saat ini: ${sanitized.length})`);
  }

  return sanitized;
}

// function helper untuk error handling untuk ai
async function generateContentWithRetry(model: any, prompt: string, maxRetries = 3) {
  let retries = 0;
  let delay = 1000; // 1 detik

  while (retries < maxRetries) {
    try {
      const result = await model.generateContent(prompt);
      return result;
    } catch (error: any) {
      const errorMessage = error.message;

      // Cek apakah errornya karena server sibuk (503) atau Rate Limit (429)
      const isRetryableError = errorMessage.includes('503') || errorMessage.includes('429') || errorMessage.includes("high demand");

      if (isRetryableError && retries < maxRetries - 1) {
        retries++;
        // Jeda eksekusi (Tunggu)
        await new Promise(resolve => setTimeOut(resolve, delay));
        // Lipat gandakan waktu tunggu untuk percobaan berikutnya
        delay *= 2;
      } else {
        // Jika error lain (misal 400 Bad Request) atau jatah retry habis, lempar errornya ke blok utama
        throw error;
      }
    }
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response('ok', { headers: corsHeaders });
  }

  let insertedTxId = null;
  let supabaseClient = null;

  try {
    const { laporan } = await req.json();
    let { nama_pelapor, raw_complaint } = laporan;

    nama_pelapor = validateAndSanitizeInput(nama_pelapor, "Nama Pelapor", 100);
    raw_complaint = validateAndSanitizeInput(raw_complaint, "Detail Laporan", 1000);

    if (!nama_pelapor || !raw_complaint) {
      throw new Error("Nama pelapor dan detail laporan wajib diisi.");
    }

    // INISIALISASI Gemini & SUPABASE (Gatekeeper Pattern)
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') ?? '');
    supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // mengabaikan rls supaya data dari publik bisa berjalan
    );

    // definisi json schema supaya data tidak keluar dari konteks dan tipe data yang 100% pasti
    const responseSchema = {
      type: SchemaType.OBJECT,
      properties: {
        ai_extracted_code: {
          type: SchemaType.STRING,
          description: "Nomor kode barang. Selalu ubah formatnya menjadi HURUF KAPITAL (UPPERCASE), contoh: 'MPD-004'. Jika user membicarakan hal di luar konteks laporan kerusakan atau tidak menyebutkan kode barang, WAJIB isi dengan 'TIDAK_DITEMUKAN'."
        },
        ai_urgency: {
          type: SchemaType.STRING,
          enum: ["low", "medium", "high"], // Memaksa AI hanya memilih salah satu dari ini
          description: "Tingkat kegentingan dari kerusakan yang dilaporkan. Jika laporan di luar konteks, pilih 'low"
        },
        ai_recomendation: {
          type: SchemaType.STRING,
          description: "Saran perbaikan teknis singkat (Maksimal 2 kalimat). Jika laporan di luar konteks, isi dengan 'Tidak ada rekomendasi karena laporan tidak valid.'"
        }
      },
      required: ["ai_extracted_code", "ai_urgency", "ai_recomendation"]
    };

    // konfigurasi model gemini
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite", // Model tercepat dan optimal untuk teks
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema, // Inject schema ke model
        temperature: 0.1, // Deterministik, minimalkan halusinasi
      }
    });

    // PEMANGGILAN AI
    const prompt = `
      Anda adalah sistem otomatis asrama yang ketat dan profesional.
      Tugas Anda HANYA mengekstrak data dari laporan kerusakan fasilitas.
      
      ATURAN KETAT:
      1. Jika teks berisi candaan, curhatan, atau tidak berhubungan dengan kerusakan fasilitas, Anda tidak boleh meladeninya. Langsung kembalikan kode 'TIDAK_DITEMUKAN'.
      2. Ekstrak kode barang dan pastikan selalu dalam HURUF KAPITAL.
      
      Teks Laporan dari User:
      "${raw_complaint}"
    `;
    const result = await generateContentWithRetry(model, prompt);

    const aiData = JSON.parse(result.response.text());

    // Memaksa string menjadi kapital dan menghapus spasi ekstra di awal/akhir
    const normalizeCode = aiData.ai_extracted_code.trim().toUpperCase();

    if (normalizeCode === "TIDAK_DITEMUKAN") {
      throw new Error("Sistem tidak dapat mendeteksi nomor/kode barang dari laporan Anda. Mohon tuliskan nomor barang dengan jelas.");
    }

    const { data: dataStok, error: errorStok } = await supabaseClient
      .from("item_stocks")
      .select('id')
      .eq('kode_label', normalizeCode)
      .single();

    if (errorStok || !dataStok) {
      throw new Error(`Kode barang ${aiData.ai_extracted_code} tidak ditemukan dalam database sistem asrama. Mohon periksa kembali.`)
    }

    const { data: dataLaporan, error: errorLaporan } = await supabaseClient
      .from('laporan_kerusakan')
      .insert({
        nama_pelapor: nama_pelapor.trim(),
        raw_complaint: raw_complaint.trim(),
        ai_extracted_code: normalizeCode,
        ai_urgency: aiData.ai_urgency,
        ai_recomendation: aiData.ai_recomendation,
        stok_id: dataStok.id,
        status: 'open'
      })
      .select()
      .single();

    if (errorLaporan) throw new Error(`Gagal menyimpan laporan: ${errorLaporan.message}`);

    insertedTxId = dataLaporan.id;

    const { error: errorUpdateStok } = await supabaseClient
      .from('item_stocks')
      .update({ status: "rusak" })
      .eq('id', dataStok.id);

    if (errorUpdateStok) {
      throw new Error(`Gagal mengupdate status stok fisik: ${errorUpdateStok.message}`);
    }

    return new Response(JSON.stringify({ success: true, data: dataLaporan }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // rollback jika update stok gagal
    if (insertedTxId && supabaseClient) {
      await supabaseClient
        .from('laporan_kerusakan')
        .delete()
        .eq('id', insertedTxId)
    }

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})