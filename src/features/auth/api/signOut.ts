import { clearStorageItem } from "@/lib/localStorage";
import { supabase } from "@/lib/supabase";

export const sigOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  clearStorageItem("AUTH");
};
