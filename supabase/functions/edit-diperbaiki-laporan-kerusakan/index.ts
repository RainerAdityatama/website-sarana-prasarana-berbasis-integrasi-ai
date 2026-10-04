import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Konfigurasi CORS agar bisa dipanggil dari frontend (React)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response('ok', { headers: corsHeaders });
  }

  let isUpdatedLaporan = false;
  let supabaseClient = null;
  let targetLaporanId = null;

  try {
    const { laporan_kerusakan } = await req.json();
    const { id_laporan, stok_id } = laporan_kerusakan;

    targetLaporanId = id_laporan;

    if (!targetLaporanId) throw new Error("Tidak ada Laporan yang dipilih, gagal mengubah data");
    if (!stok_id) throw new Error("Tidak ada stok barang yang dipilih, gagal mengubah data");

    supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: dataLaporan, error: errorLaporan } = await supabaseClient
      .from('laporan_kerusakan')
      .update({ status: "in_proggress" })
      .eq("id", targetLaporanId)
      .select()
      .single();

    if (errorLaporan) {
      throw new Error(`Gagal mengupdate status laporan kerusakan: ${errorLaporan.message}`);
    }

    isUpdatedLaporan = true;

    const { error: errorStokBarang } = await supabaseClient
      .from('item_stocks')
      .update({ status: "sedang_diperbaiki" })
      .eq("id", stok_id);

    if (errorStokBarang) {
      throw new Error(`Gagal mengupdate status stok barang: ${errorStokBarang.message}`);
    }

    return new Response(JSON.stringify({ success: true, data: dataLaporan }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // logic rollback
    if (isUpdatedLaporan === true && supabaseClient && targetLaporanId) {
      await supabaseClient.from('laporan_kerusakan').update({ status: 'open' }).eq('id', targetPeminjamanId)
    }

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})