import { supabase } from "../../../api/supabase";

export const GetAllBarangAdmin = async (filter = null) => {
  let query = supabase
    .from("items")
    .select("*")
    .order("id", { ascending: true });

  if (filter !== null) {
    query = query.eq("kategori", filter);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return {
    data,
  };
};
