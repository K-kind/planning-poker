const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "apikey, X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
};

export const handleWithCors = (
  handler: (req: Request) => Promise<Response>
) => {
  return (req: Request) => {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    return handler(req);
  };
};

type ResponseParams = { body: Record<string, unknown>; status: number };

export const jsonResponse = ({ body, status }: ResponseParams) => {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
};
