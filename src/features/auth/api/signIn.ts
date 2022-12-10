import { supabase } from "@/lib/supabase";

type SignInParams = { email: string; password: string };

export const signIn = async ({ email, password }: SignInParams) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return { user: data.user!, session: data.session! };
};
