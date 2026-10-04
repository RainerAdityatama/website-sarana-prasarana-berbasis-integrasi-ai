import { supabase } from "../../../api/supabase";

export const EditSelesaiLaporanKerusakan = async (laporan_kerusakan) => {
  const { data, error } = await supabase.functions.invoke(
    "edit-selesai-laporan-kerusakan",
    {
      body: { laporan_kerusakan: laporan_kerusakan },
    },
  );

  if (error) throw new Error(error.message);

  if (data?.error) throw new Error(data.error);

  return data.data;
};
