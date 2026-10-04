import { supabase } from "../../../api/supabase";

export const TambahPeminjamanPublic = async (peminjaman) => {
  const { data, error } = await supabase.functions.invoke(
    "create-peminjaman-publik",
    {
      body: { peminjaman: peminjaman },
    },
  );

  // Handle jika eksekusi function gagal karena internet mati atau hal tak terduga
  if (error) throw new Error(error.message);

  // Jika backend melempar custom error di dalam response JSON karena logic yang dibuat
  if (data?.error) throw new Error(data.error);

  return data.data;
};
