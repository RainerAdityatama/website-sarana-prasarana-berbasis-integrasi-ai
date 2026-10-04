/* eslint-disable preserve-caught-error */
import { supabase } from "../../../api/supabase";

export const TambahLaporanKerusakan = async (laporan) => {
  const { data, error } = await supabase.functions.invoke(
    "create-laporan-kerusakan-publik",
    {
      body: { laporan: laporan },
    },
  );

  if (error) {
    // Mengecek apakah error ini memiliki context (raw response dari server)
    if (error.context && typeof error.context.json === "function") {
      try {
        // Ekstrak payload JSON asli yang kita kirim dari Edge Function
        const errorData = await error.context.json();

        // Lempar pesan custom kita agar bisa ditangkap oleh React Toast
        throw new Error(errorData.error || "Terjadi kesalahan pada server.");
      } catch (error) {
        // Fallback jika response gagal di-parse sebagai JSON
        throw new Error(error.message);
      }
    }

    // Fallback untuk network error biasa (misal: internet mati)
    throw new Error(error.message);
  }

  if (data?.error) throw new Error(data.error);

  return data.data;
};
