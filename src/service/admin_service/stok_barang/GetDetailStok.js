import { supabase } from "../../../api/supabase";

export const GetDetailStok = async (id) => {
  const { data, error } = await supabase
    .from("item_stocks")
    .select("id, items (name), kode_label, status, created_at")
    .eq("item_id", id)
    .eq("is_active", true);

  if (error) throw new Error(error.message);

  return data;
};
