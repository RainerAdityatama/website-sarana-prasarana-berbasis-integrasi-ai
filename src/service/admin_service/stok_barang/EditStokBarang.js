import { supabase } from "../../../api/supabase";

export const EditStokBarang = async ({ id, ...form }) => {
  const { data, error } = await supabase
    .from("item_stocks")
    .update(form)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
