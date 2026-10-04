import { supabase } from "../../../api/supabase";

export const EditHilangPeminjaman = async (peminjaman) => {
  const { data, error } = await supabase.functions.invoke(
    "edit-hilang-peminjaman",
    {
      body: { peminjaman: peminjaman },
    },
  );

  if (error) throw new Error(error.message);

  if (data?.error) throw new Error(data.error);

  return data.data;
};
