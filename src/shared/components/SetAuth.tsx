import { ReactNode, useCallback, useContext, useEffect } from "react";
import { getUser } from "@/features/auth/api/getUser";
import { anonSignIn } from "@/features/auth/api/anonSignIn";
import { onStateChanged } from "@/features/auth/api/onStateChanged";
import { AuthContext } from "@/providers/auth";

type Props = {
  children: ReactNode;
};

export const SetAuth = ({ children }: Props) => {
  const { user, setUser } = useContext(AuthContext);
  const fetchAndSetUser = useCallback(async () => {
    const u = (await getUser()).user ?? (await anonSignIn()).user;
    setUser(u);
  }, [setUser]);

  if (user === undefined) throw fetchAndSetUser();

  useEffect(() => {
    return onStateChanged({
      TOKEN_REFRESHED: (session) => {
        setUser(session?.user ?? null);
      },
      SIGNED_IN: (session) => {
        setUser(session?.user ?? null);
      },
      SIGNED_OUT: (session) => {
        setUser(session?.user ?? null);
      },
    });
  }, [setUser]);

  return <>{children}</>;
};
