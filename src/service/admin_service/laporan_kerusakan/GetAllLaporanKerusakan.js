import { supabase } from "../../../api/supabase";

export const GetAllLaporanKerusakan = async (filter = null) => {
  let query = supabase
    .from("laporan_kerusakan")
    .select(
      "id, nama_pelapor, raw_complaint, ai_extracted_code, ai_urgency, ai_recomendation, item_stocks (kode_label), stok_id, status, created_at, resolved_at",
    )
    .order("id", { ascending: true });

  if (filter !== null) {
    query = query.eq("status", filter);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return { data };
};
