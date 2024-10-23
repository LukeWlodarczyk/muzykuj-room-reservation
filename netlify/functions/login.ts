import { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(`Login!`);
};

export const config: Config = {
  path: "/login",
};
