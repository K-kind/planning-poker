import { useCallback, useContext } from "react";
import { anonSignUp } from "@/features/auth/api/anonSignUp";
import { AuthContext } from "@/providers/auth";

/** Ensure that the user is signed in. */
export const useEnsureSignIn = () => {
  const { user, setUser, authError, setAuthError } = useContext(AuthContext);

  const forceSignIn = useCallback(async () => {
    if (user) return;

    // The anonSignIn is assumed to have already been tried by SetAuth Component.
    try {
      const u = (await anonSignUp()).user;
      setUser(u);
    } catch (e) {
      setAuthError(e as Error);
    }
  }, [user, setUser, setAuthError]);

  if (authError === undefined && !user) throw forceSignIn();
};
