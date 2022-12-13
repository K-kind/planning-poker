import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/features/auth/api/signUp";
import { setStorageItem } from "@/lib/localStorage";
import { uuid } from "@/shared/utils/uuid";
import { AuthContext } from "@/providers/auth";

export const anonSignUp = async () => {
  const email = generateRandomEmail();
  const password = generateRandomPassword();
  const data = await signUp({ email, password });

  setStorageItem("AUTH", { email, password });
  return data;
};

const generateRandomEmail = () => {
  return `planning-poker-anon-${uuid()}@example.com`;
};

const generateRandomPassword = () => {
  return `${uuid()}${uuid()}`;
};

export const useAnonSignUp = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: () => anonSignUp().then(({ user }) => setUser(user)),
  });
};
