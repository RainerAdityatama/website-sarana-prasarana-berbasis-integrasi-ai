import { supabase } from "../../../api/supabase";

export const PulihkanStokBarang = async (id) => {
  const { data, error } = await supabase
    .from("item_stocks")
    .update({ status: "tersedia", is_active: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
