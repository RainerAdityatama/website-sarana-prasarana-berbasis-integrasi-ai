import { supabase } from "../../../api/supabase";

export const GetStokHilang = async () => {
  const { data, error } = await supabase
    .from("item_stocks")
    .select("id, items (name), kode_label")
    .eq("is_active", false)
    .order("item_id", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};
