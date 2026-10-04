import { supabase } from "../../../api/supabase";

export const HapusPeminjaman = async (id) => {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
};
