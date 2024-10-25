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
};

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(firebaseAdminCredential);
}

const firestoreAdmin = firebaseAdmin.firestore();

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

  const userTicket = ticket.getPayload();

  if (!userTicket?.email) return createUnauthorizedResponse();

  const userSnapshot = await firestoreAdmin
    .collection("users")
    .where("email", "==", userTicket.email)
    .get();

  if (userSnapshot.empty) return createUnauthorizedResponse();

  const userDoc = userSnapshot.docs[0];
  const user = userDoc.data();

  const authUser = await firebaseAdmin
    .auth()
    .getUser(userDoc.id)
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        const newAuthUser = firebaseAdmin.auth().createUser({
          uid: userDoc.id,
          email: userTicket.email,
          displayName: userTicket.name,
        });
        return newAuthUser;
      }

      throw error;
    });

  const firebaseCustomToken = await firebaseAdmin
    .auth()
    .createCustomToken(authUser.uid, { access: user.access });

  return createResponse({
    message: "Success",
    token: firebaseCustomToken,
    status: 200,
  });
};

export const config: Config = {
  method: "POST",
  path: "/api/login/token",
};
