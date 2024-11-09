import { FC } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import styles from "./LoginWithGoogle.module.css";

type Props = {
  onClick: () => void;
  onSuccess: ({ credential }: CredentialResponse) => Promise<void>;
  onError: () => void;
};

const LoginWithGoogle: FC<Props> = ({ onClick, onSuccess, onError }) => (
  <GoogleLogin
    click_listener={onClick}
    onSuccess={onSuccess}
    onError={onError}
    type="standard"
    logo_alignment="center"
    text="continue_with"
    shape="pill"
    containerProps={{
      className: styles.googleLogin,
    }}
  />
);

export default LoginWithGoogle;
