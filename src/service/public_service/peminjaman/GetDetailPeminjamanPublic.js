import { supabase } from "../../../api/supabase";

export const GetPeminjamanManagementPublic = async (id) => {
  // Helper Function: Regex untuk mengecek format UUID
  const isValidUUID = (id) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  if (!isValidUUID(id)) {
    throw new Error("ID Peminjaman tidak valid. Peminjaman tidak ditemukan.");
  }

  const { data, error } = await supabase
    .from("transactions")
    .select(
      "id, stok_id, item_stocks (kode_label), nama_peminjam, lokasi, status, borrowed_at, returned_at",
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
