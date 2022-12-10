// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabaseAdminClient } from "../_shared/supabaseAdmin.ts";
import { Database } from "../../../generated-schema.ts";
import { handleWithCors, jsonResponse } from "../_shared/handleWithCors.ts";
import { getUser } from "../_shared/auth.ts";

type Params = Database["public"]["Tables"]["rooms"]["Insert"];

serve(
  handleWithCors(async (req) => {
    try {
      const user = await getUser(req);
      if (user == null) {
        const message = "Unauthorized";
        return jsonResponse({ body: { message }, status: 401 });
      }

      const params = (await req.json().catch(() => null)) as Params | null;
      if (params == null) {
        const message = "Unprocessable Entity";
        return jsonResponse({ body: { message }, status: 422 });
      }

      const { data, error } = await supabaseAdminClient
        .from("rooms")
        .insert({
          name: params.name ?? "Room",
          card_status: params.card_status,
          cards: params.cards,
          players: params.players,
        })
        .select();
      if (error) throw error;

      return jsonResponse({ body: { data: data[0] }, status: 200 });
    } catch (error) {
      console.error(error);
      return jsonResponse({ body: { error: error.message }, status: 400 });
    }
  })
);
