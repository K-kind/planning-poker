import { signIn } from "@/features/auth/api/signIn";
import { getStorageItem } from "@/lib/localStorage";

export const anonSignIn = async () => {
  const item = getStorageItem("AUTH");
  if (item == null) return { user: null, session: null };

  const data = await signIn({ email: item.email, password: item.password });
  return data;
};
