import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.1";
import { Database } from "../../../generated-schema.ts";

export const supabaseAdminClient = createClient<Database>(
  // Supabase API URL - env var exported by default.
  Deno.env.get("SUPABASE_URL")!,
  // Supabase service role key - env var exported by default.
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
