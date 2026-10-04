import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let isUpdatedPeminjaman = null;
  let supabaseClient = null;
  let targetPeminjamanId = null;

  try {
    const { peminjaman } = await req.json();
    const { stok_id, id_peminjaman } = peminjaman;

    targetPeminjamanId = id_peminjaman;

    if (!stok_id) throw new Error("Tidak ada stok barang yang dipilih, gagal mengubah data");
    if (!targetPeminjamanId) throw new Error("Tidak ada peminjaman yang dipilih, gagal mengubah data");

    supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: txData, error: errorTransaction } = await supabaseClient
      .from('transactions')
      .update({ status: 'hilang' })
      .eq('id', targetPeminjamanId)
      .select()
      .single();

    if (errorTransaction) {
      throw new Error(`Gagal mengupdate status peminjaman: ${errorTransaction.message}`);
    }

    isUpdatedPeminjaman = true;

    const { error: errorStokBarang } = await supabaseClient
      .from('item_stocks')
      .update({ is_active: false })
      .eq('id', stok_id)

    if (errorStokBarang) {
      throw new Error(`Gagal mengupdate status stok barang: ${errorStokBarang.message}`);
    }

    return new Response(JSON.stringify({ success: true, data: txData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    // logic rollback
    if (isUpdatedPeminjaman === true && supabaseClient && targetPeminjamanId) {
      await supabaseClient.from('transactions').update({ status: 'dipinjam' }).eq('id', targetPeminjamanId)
    }

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
});