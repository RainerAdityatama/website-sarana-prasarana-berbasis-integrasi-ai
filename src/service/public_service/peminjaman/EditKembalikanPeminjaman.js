import { supabase } from "../../../api/supabase";

export const EditKembalikanPeminjamanPublic = async (peminjaman) => {
  const { data, error } = await supabase.functions.invoke(
    "edit-kembalikan-peminjaman-publik",
    {
      body: { peminjaman: peminjaman },
    },
  );

  if (error) throw new Error(error.message);

  if (data?.error) throw new Error(data.error);

  return data.data;
};
