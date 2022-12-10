import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/features/auth/api/signUp";
import { setStorageItem } from "@/lib/localStorage";
import { uuid } from "@/shared/utils/uuid";

export const anonSignUp = async () => {
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  const data = await signUp({ email, password });

  setStorageItem("AUTH", { email, password });
  return data;
};

export const generateRandomEmail = () => {
  return `planning-poker-anon-${uuid()}@example.com`;
};

export const generateRandomPassword = () => {
  return `${uuid()}${uuid()}`;
};

export const useAnonSignUp = () => {
  return useMutation({
    mutationFn: () => anonSignUp(),
  });
};
