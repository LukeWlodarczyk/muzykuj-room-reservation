import { useNavigate } from "react-router-dom";

import { CredentialResponse } from "@react-oauth/google";

import { getFirebaseCustomToken } from "@/features/login/api";
import { signInWithCustomToken } from "@/features/login/actions";
import useLoginProcessStatus from "@/features/login/hooks/useLoginProcessStatus";

import { paths } from "@/router";

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
  };

  return {
    initialize,
    process: {
      status: loginProcess.status,
      setGoogleAuthenticatingError: loginProcess.setGoogleAuthenticatingError,
      setGoogleAuthenticating: loginProcess.setGoogleAuthenticating,
    },
    navigate: () => navigate(paths.RESERVATIONS),
  };
};

export default useFirebaseLogin;
