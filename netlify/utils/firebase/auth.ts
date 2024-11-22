import { BaseAuth } from "firebase-admin/auth";
import { authAdmin } from "./firebase";

type User = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

export const getOrCreateAuthUser = (user: User) =>
  authAdmin.getUser(user.id).catch(async (error) => {
    if (error.code === "auth/user-not-found") {
      const newAuthUser = await authAdmin.createUser({
        uid: user.id,
        email: user.email,
        displayName: user.name,
        photoURL: user.picture,
      });

      return newAuthUser;
    }

    throw error;
  });

export const createCustomToken: BaseAuth["createCustomToken"] = (uid, claims) =>
  authAdmin.createCustomToken(uid, claims);

export const verifyToken = async (req) => {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  const decodedToken = await authAdmin.verifyIdToken(token).catch(() => null);

  return decodedToken;
};
