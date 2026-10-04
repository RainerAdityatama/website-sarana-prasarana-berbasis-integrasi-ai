import { supabase } from "../../../api/supabase";

export const TandaiRusakStok = async (id) => {
  const { data, error } = await supabase
    .from("item_stocks")
    .update({ status: "rusak" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
