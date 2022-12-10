import { supabase } from "@/lib/supabase";

type SignUpParams = { email: string; password: string };

export const signUp = async ({ email, password }: SignUpParams) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return { user: data.user!, session: data.session! };
};
