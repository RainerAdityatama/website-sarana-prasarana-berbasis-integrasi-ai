import { supabase } from "../../../api/supabase";

export const GetAllPeminjamanAdmin = async (filter = null) => {
  let query = supabase
    .from("transactions")
    .select(
      "id, stok_id, item_stocks (kode_label), nama_peminjam, lokasi, status, borrowed_at, returned_at",
    )
    .order("id", { ascending: true });

  if (filter !== null) {
    query = query.eq("status", filter);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return { data };
};
