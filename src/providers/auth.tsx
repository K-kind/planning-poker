import { createContext, ReactNode, useState } from "react";
import { AuthUser } from "@/features/auth/types/auth";

export type ContextValue = {
  user: AuthUser | null | undefined;
  setUser: (user: AuthUser | null | undefined) => void;
};

export const AuthContext = createContext<ContextValue>({} as ContextValue);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);
  const value: ContextValue = { user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
