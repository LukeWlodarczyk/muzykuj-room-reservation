import { Config, Context } from "@netlify/functions";
import firebaseAdmin from "firebase-admin";

const {
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY,
  FIREBASE_ADMIN_PROJECT_ID,
} = process.env;

const firebaseAdminCredential = {
  credential: firebaseAdmin.credential.cert({
    clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
    projectId: FIREBASE_ADMIN_PROJECT_ID,
  }),
  //   databaseURL: "https://joe-blog-fake.firebaseio.com/",
};

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(firebaseAdminCredential);
}

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
