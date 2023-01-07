// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabaseAdminClient } from "../_shared/supabaseAdmin.ts";
import { handleWithCors, jsonResponse } from "../_shared/handleWithCors.ts";
import { getUser } from "../_shared/auth.ts";
import { Database } from "../../../generated-schema.ts";

type RoomUserRow = Database["public"]["Tables"]["room_users"]["Row"];
type Params = { room_id: string };

serve(
  handleWithCors(async (req) => {
    try {
      const user = await getUser(req);
      if (user == null) {
        const message = "Unauthorized";
        return jsonResponse({ body: { message }, status: 401 });
      }

      const params = (await req.json().catch(() => null)) as Params | null;
      const roomId = params?.room_id;
      if (typeof roomId !== "string") {
        const message = "Unprocessable Entity";
        return jsonResponse({ body: { message }, status: 422 });
      }

      const data = await fetchOrCreateRoomUser(roomId, user.id);

      return jsonResponse({ body: { data }, status: 200 });
    } catch (error) {
      console.error(error);
      return jsonResponse({ body: { error: error.message }, status: 400 });
    }
  })
);

const fetchOrCreateRoomUser = async (roomId: string, userId: string) => {
  return (
    (await fetchRoomUser(roomId, userId)) ??
    (await createRoomUser(roomId, userId))
  );
};

const fetchRoomUser = async (
  roomId: string,
  userId: string
): Promise<RoomUserRow | undefined> => {
  const { data, error } = await supabaseAdminClient
    .from("room_users")
    .select("*")
    .eq("room_id", roomId)
    .eq("user_id", userId);
  if (error) throw error;

  return data[0];
};

const createRoomUser = async (roomId: string, userId: string) => {
  const { data, error } = await supabaseAdminClient
    .from("room_users")
    .insert({
      room_id: roomId,
      user_id: userId,
    })
    .select();
  if (error) throw error;

  return data[0];
};
