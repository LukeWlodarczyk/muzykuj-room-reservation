import { Config, Context } from "@netlify/functions";

interface RequestBody {
  token?: string;
}

const createResponse = ({ status, ...body }) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export default async (req: Request, context: Context) => {
  const body: RequestBody = await req.json();

  const { token: googleToken } = body;

  if (!googleToken) {
    return createResponse({
      message: "Unauthorized",
      token: null,
      status: 401,
    });
  }

  const firebaseCustomToken = "1234567";

  return createResponse({
    message: "Success",
    token: firebaseCustomToken,
    status: 200,
  });
};

export const config: Config = {
  method: "POST",
  path: "/api/login",
};
