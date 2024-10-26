import { FC } from "react";
import { GoogleLogin } from "@react-oauth/google";

import useFirebaseLogin from "./useFirebaseLogin";

const Login: FC = () => {
  const login = useFirebaseLogin();

  return (
    <div>
      <GoogleLogin
        click_listener={login.process.setGoogleAuthenticating}
        onSuccess={login.initialize}
        onError={login.process.setGoogleAuthenticatingError}
        size="large"
        width={250}
        logo_alignment="center"
      />
      <p>Status: {login.process.status}</p>
    </div>
  );
};

export default Login;
