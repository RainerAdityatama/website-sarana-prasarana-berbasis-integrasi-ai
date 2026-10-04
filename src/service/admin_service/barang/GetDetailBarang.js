import { supabase } from "../../../api/supabase";

export const GetDetailBarang = async (id) => {
  // Helper Function: Regex untuk mengecek format UUID
  const isValidUUID = (id) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  if (!isValidUUID(id)) {
    throw new Error("ID Barang tidak valid. Stok Barang tidak ditemukan.");
  }

  const { data, error } = await supabase
    .from("items")
    .select("id, name")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
