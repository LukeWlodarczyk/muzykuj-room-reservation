import axios from "axios";

type CustomTokenResponse = {
  token: string;
};

export const getFirebaseCustomToken = async (googleCredential: string) =>
  axios
    .post<CustomTokenResponse>("/.netlify/functions/login", {
      token: googleCredential,
    })
    .then((response) => response.data.token);
