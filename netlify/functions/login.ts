import { Config } from "@netlify/functions";
import { createResponse, createUnauthorizedResponse } from "../utils/response";
import * as google from "../utils/googleAuth";
import * as adminAuth from "../utils/firebase/auth";
import * as firestoreAdmin from "../utils/firebase/firestore/users";

interface RequestBody {
  token?: string;
}

export default async (req: Request) => {
  try {
    const body: RequestBody = await req.json();

    const { token: googleToken } = body;

    if (!googleToken) return createUnauthorizedResponse();

    const payload = await google.verifyToken(googleToken);

    if (!(payload && payload.email)) return createUnauthorizedResponse();

    const user = await firestoreAdmin.getUserByEmail(payload.email);

    if (!user) return createUnauthorizedResponse();

    const authUser = await adminAuth.getOrCreateAuthUser({
      id: user.id,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });

    const firebaseCustomToken = await adminAuth.createCustomToken(
      authUser.uid,
      {
        access: user.access,
      }
    );

    return createResponse({
      message: "Success",
      token: firebaseCustomToken,
      status: 200,
    });
  } catch (error) {
    return createResponse({
      status: 500,
      message: `Unknown error: ${error.message}`,
    });
  }
};

export const config: Config = {
  method: "POST",
};
