import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/features/auth/api/signUp";
import { setStorageItem } from "@/lib/localStorage";
import {
  generateRandomEmail,
  generateRandomPassword,
} from "@/shared/utils/randomValues";

export const anonSignUp = async () => {
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  const data = await signUp({ email, password });

  setStorageItem("AUTH", { email, password });
  return data;
};

export const useAnonSignUp = () => {
  return useMutation({
    mutationFn: () => anonSignUp(),
  });
};
