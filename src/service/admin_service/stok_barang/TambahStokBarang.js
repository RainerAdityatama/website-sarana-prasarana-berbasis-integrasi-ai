import { supabase } from "../../../api/supabase";

export const TambahStokBarang = async (form) => {
  const { data, error } = await supabase
    .from("item_stocks")
    .insert([form])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
