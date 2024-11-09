import { signInWithCustomToken as logInWithCustomToken } from "firebase/auth";

import { auth } from "@/services/firebase/auth";

export const signInWithCustomToken = (token: string) =>
  logInWithCustomToken(auth, token);
