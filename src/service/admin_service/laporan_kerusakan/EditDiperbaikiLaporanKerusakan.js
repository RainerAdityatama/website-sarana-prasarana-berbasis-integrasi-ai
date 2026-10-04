import { supabase } from "../../../api/supabase";

export const EditDiperbaikiLaporanKerusakan = async (laporan_kerusakan) => {
  const { data, error } = await supabase.functions.invoke(
    "edit-diperbaiki-laporan-kerusakan",
    {
      body: { laporan_kerusakan: laporan_kerusakan },
    },
  );

  if (error) throw new Error(error.message);

  if (data?.error) throw new Error(data.error);

  return data.data;
};
