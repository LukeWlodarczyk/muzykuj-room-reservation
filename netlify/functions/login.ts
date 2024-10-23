import { Config, Context } from "@netlify/functions";
import firebaseAdmin from "firebase-admin";
import { OAuth2Client } from "google-auth-library";

const {
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY,
  FIREBASE_ADMIN_PROJECT_ID,
  VITE_GOOGLE_OAUTH_CLIENT_ID,
} = process.env;

const googleAuthClient = new OAuth2Client(VITE_GOOGLE_OAUTH_CLIENT_ID);

const firebaseAdminCredential = {
  credential: firebaseAdmin.credential.cert({
    clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: FIREBASE_ADMIN_PRIVATE_KEY
      ? FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
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

const createUnauthorizedResponse = () =>
  createResponse({
    message: "Unauthorized",
    token: null,
    status: 401,
  });

export default async (req: Request, context: Context) => {
  const body: RequestBody = await req.json();

  const { token: googleToken } = body;

  if (!googleToken) {
    return createUnauthorizedResponse();
  }

  const ticket = await googleAuthClient
    .verifyIdToken({
      idToken: googleToken,
      audience: VITE_GOOGLE_OAUTH_CLIENT_ID,
    })
    .catch(() => null);

  if (!ticket) return createUnauthorizedResponse();

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
