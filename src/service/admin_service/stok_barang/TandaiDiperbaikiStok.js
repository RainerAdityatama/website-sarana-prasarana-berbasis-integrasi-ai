import { supabase } from "../../../api/supabase";

export const TandaiDiperbaikiStok = async (id) => {
  const { data, error } = await supabase
    .from("item_stocks")
    .update({ status: "sedang_diperbaiki" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
