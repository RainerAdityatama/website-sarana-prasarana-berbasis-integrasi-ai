import { supabase } from "../../../api/supabase";

export const createBarang = async (barang) => {
  const { data, error } = await supabase
    .from("items")
    .insert([barang])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
