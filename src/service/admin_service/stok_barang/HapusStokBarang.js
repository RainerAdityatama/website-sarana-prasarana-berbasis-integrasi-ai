import { supabase } from "../../../api/supabase";

export const HapusStokBarang = async (id) => {
  const { data, error } = await supabase
    .from("item_stocks")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
};
