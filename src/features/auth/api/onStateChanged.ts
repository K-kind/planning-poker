import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Listeners = {
  TOKEN_REFRESHED?: (session: Session | null) => void;
  SIGNED_IN?: (session: Session | null) => void;
  SIGNED_OUT?: (session: Session | null) => void;
};

export const onStateChanged = (listeners: Listeners) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    const keys = Object.keys(listeners) as (keyof Listeners)[];
    for (const key of keys) {
      if (event === key) listeners[key]?.(session);
    }
  });

  return () => data.subscription.unsubscribe();
};
