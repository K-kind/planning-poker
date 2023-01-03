// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { supabaseAdminClient } from "../_shared/supabaseAdmin.ts";
import { Database } from "../../../generated-schema.ts";
import { handleWithCors, jsonResponse } from "../_shared/handleWithCors.ts";
import { getUser } from "../_shared/auth.ts";
import {
  SLACK_CHANNEL,
  SLACK_TOKEN,
} from "../_shared/environment-variables.ts";

type Params = { content: string };
type RequestRow = Database["public"]["Tables"]["requests"]["Row"];

const SLACK_POST_URL = "https://slack.com/api/chat.postMessage";

serve(
  handleWithCors(async (req) => {
    try {
      const params = (await req.json().catch(() => null)) as Params | null;
      if (params == null) {
        const message = "Unprocessable Entity";
        return jsonResponse({ body: { message }, status: 422 });
      }

      const user = await getUser(req);

      const { data, error } = await supabaseAdminClient
        .from("requests")
        .insert({
          user_id: user ? user.id : null,
          content: params.content,
        })
        .select();
      if (error) throw error;

      const insertedRow = data[0];

      await notifyToSlack(insertedRow).catch((e) => console.error(e));

      return jsonResponse({ body: { data: insertedRow }, status: 200 });
    } catch (error) {
      console.error(error);
      return jsonResponse({ body: { error: error.message }, status: 400 });
    }
  })
);

const notifyToSlack = async (request: RequestRow) => {
  const text = `ユーザーからご意見が届きました。
ユーザーID: ${String(request.user_id)}
内容:
${request.content}`;

  const body = new FormData();
  body.set("channel", SLACK_CHANNEL!);
  body.set("token", SLACK_TOKEN!);
  body.set("text", text);

  const response = await fetch(SLACK_POST_URL, { method: "POST", body });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(`notifyToSlack failed: ${JSON.stringify(data)}`);
  }
};
