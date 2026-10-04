import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Konfigurasi CORS agar bisa dipanggil dari frontend (React)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  // Handle preflight request dari browser (CORS)
  if (req.method === "OPTIONS") {
    return new Response('ok', { headers: corsHeaders });
  }

  let insertedTxId = null;
  let supabaseClient = null;

  try {
    // Ekstrak payload dari Frontend
    const { peminjaman } = await req.json();
    const { stok_id, nama_peminjam, lokasi } = peminjaman;

    if (!stok_id) {
      throw new Error("Mohon pilih stok barang untuk peminjaman");
    }
    if (!nama_peminjam || nama_peminjam.trim() === '') {
      throw new Error("Nama peminjam wajib diisi.");
    }
    if (!lokasi || lokasi.trim() === '') {
      throw new Error("Lokasi penggunaan wajib diisi.");
    }

    // Inisialisasi Supabase Client dengan Auth Context User
    supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // mengabaikan rls supaya data dari publik bisa berjalan
    );

    // Insert data ke tabel transactions
    const { data: txData, error: txError } = await supabaseClient
      .from('transactions')
      .insert({
        stok_id: stok_id,
        nama_peminjam: nama_peminjam.trim(),
        lokasi: lokasi.trim(),
        status: 'dipinjam'
      })
      .select()
      .single();

    if (txError) throw new Error(`Gagal mencatat transaksi: ${txError.message}`)

    insertedTxId = txData.id;

    // update status data di tabel item_stocks
    const { error: stokError } = await supabaseClient
      .from('item_stocks')
      .update({ status: 'dipinjam' })
      .eq('id', stok_id);

    if (stokError) {
      throw new Error(`Gagal mengupdate status stok fisik: ${stokError.message}`);
    }

    return new Response(JSON.stringify({ success: true, data: txData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // rollback jika update stok gagal
    if (insertedTxId && supabaseClient) {
      await supabaseClient
        .from('transactions')
        .delete()
        .eq('id', insertedTxId)
    }

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
