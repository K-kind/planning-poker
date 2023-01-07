import { ReactNode, useCallback, useContext, useEffect } from "react";
import { getUser } from "@/features/auth/api/getUser";
import { anonSignIn } from "@/features/auth/api/anonSignIn";
import { onStateChanged } from "@/features/auth/api/onStateChanged";
import { AuthContext } from "@/providers/auth";
import { captureException } from "@/lib/sentry";

type Props = {
  children: ReactNode;
};

/**
 * Set context user initialy.
 * NOTE: Do not perform anonSignUp here to prevent signups by crawlers.
 */
export const SetAuth = ({ children }: Props) => {
  const { user, setUser, authError, setAuthError } = useContext(AuthContext);
  const fetchAndSetUser = useCallback(async () => {
    try {
      const u = (await getUser()).user ?? (await anonSignIn()).user;
      setUser(u);
    } catch (e) {
      captureException(e);
      setAuthError(e as Error);
    }
  }, [setUser, setAuthError]);

  if (authError === undefined && user === undefined) throw fetchAndSetUser();

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
