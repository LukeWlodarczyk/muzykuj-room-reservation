import { OAuth2Client } from "google-auth-library";

const { VITE_GOOGLE_OAUTH_CLIENT_ID } = process.env;

export const googleAuthClient = new OAuth2Client(VITE_GOOGLE_OAUTH_CLIENT_ID);

export const verifyToken = async (token: string) => {
  const ticket = await googleAuthClient
    .verifyIdToken({
      idToken: token,
      audience: VITE_GOOGLE_OAUTH_CLIENT_ID,
    })
    .catch(() => null);

  if (!ticket) return null;

  const payload = ticket.getPayload() || null;

  return payload;
};
