import { supabase } from "../../../api/supabase";

export const HapusBarangLogic = async (id) => {
  const { data, error } = await supabase.from("items").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return data;
};
