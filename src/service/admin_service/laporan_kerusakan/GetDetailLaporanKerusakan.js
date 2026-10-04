import { supabase } from "../../../api/supabase";

export const GetDetailLaporanKerusakan = async (id) => {
  const isValidUUID = (id) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  if (!isValidUUID(id)) {
    throw new Error(
      "ID laporan tidak valid. Laporan Kerusakan tidak ditemukan.",
    );
  }

  const { data, error } = await supabase
    .from("laporan_kerusakan")
    .select(
      "id, nama_pelapor, raw_complaint, ai_extracted_code, ai_urgency, ai_recomendation, item_stocks (kode_label), status, created_at, resolved_at",
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
