import { supabase } from "../../../api/supabase";

export const HapusLaporanKerusakan = async (id) => {
  const { data, error } = await supabase
    .from("laporan_kerusakan")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
};
