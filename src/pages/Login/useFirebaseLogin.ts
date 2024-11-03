import { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { getFirebaseCustomToken } from "@/api/auth";
import { signInWithCustomToken } from "@/services/firebase/auth";
import { paths } from "@/router";

import useLoginProcessStatus from "./useLoginProcessStatus";

const action = <T>(
  request: () => Promise<T>,
  { onInit, onError }: { onInit: () => void; onError: () => void }
): Promise<T | null> => {
  onInit();
  return request().catch(() => {
    onError();
    return null;
  });
};

const useFirebaseLogin = () => {
  const loginProcess = useLoginProcessStatus();
  const navigate = useNavigate();

  const initialize = async ({
    credential: googleToken,
  }: CredentialResponse) => {
    if (!googleToken) {
      return loginProcess.setGoogleAuthenticatingError();
    }

    const firebaseToken = await action(
      () => getFirebaseCustomToken(googleToken),
      {
        onInit: () => loginProcess.setVerifying(),
        onError: () => loginProcess.setVerifyingError(),
      }
    );

    if (!firebaseToken) return;

    const credential = await action(
      () => signInWithCustomToken(firebaseToken),
      {
        onInit: () => loginProcess.setSigningIn(),
        onError: () => loginProcess.setSigningInError(),
      }
    );

    if (!credential) return;

    loginProcess.setSignedIn();

    navigate(paths.RESERVATIONS);
  };

  return {
    initialize,
    process: {
      status: loginProcess.status,
      setGoogleAuthenticatingError: loginProcess.setGoogleAuthenticatingError,
      setGoogleAuthenticating: loginProcess.setGoogleAuthenticating,
    },
  };
};

export default useFirebaseLogin;
