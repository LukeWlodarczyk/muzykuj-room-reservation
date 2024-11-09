import { FC, ReactNode } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";

import config from "@/config";

type Props = {
  children: ReactNode;
};

const GoogleOauthProvider: FC<Props> = ({ children }) => (
  <GoogleOAuthProvider clientId={config.google.oAuthClientId}>
    {children}
  </GoogleOAuthProvider>
);

export default GoogleOauthProvider;
