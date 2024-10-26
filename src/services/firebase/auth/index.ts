import {
  getAuth,
  signInWithCustomToken as logInWithCustomToken,
} from "firebase/auth";

import { app } from "@/services/firebase";

export const auth = getAuth(app);

export const signInWithCustomToken = (token: string) =>
  logInWithCustomToken(auth, token);
