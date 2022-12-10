import { supabaseAdminClient } from "./supabaseAdmin.ts";

export const getUser = async (req: Request) => {
  const jwt = extractJwt(req.headers.get("Authorization")!);
  const {
    data: { user },
  } = await supabaseAdminClient.auth.getUser(jwt);

  return user;
};

/** 'Bearer eyJ...' => 'eyJ...' */
const extractJwt = (authHeader: string) => {
  return authHeader.slice(7);
};
