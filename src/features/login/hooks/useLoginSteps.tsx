import { ReactNode, useMemo } from "react";

import LoginWithGoogle from "../ui/LoginWithGoogle";

import useFirebaseLogin from "./useFirebaseLogin";
import { Status } from "./useLoginProcessStatus";

type Login = ReturnType<typeof useFirebaseLogin>;

const createSteps = (login: Login) =>
  new Map<Status, ReactNode>([
    [
      Status.IDLE,
      <LoginWithGoogle
        onClick={login.process.setGoogleAuthenticating}
        onSuccess={login.initialize}
        onError={login.process.setGoogleAuthenticatingError}
      />,
    ],
    [Status.GOOGLE_AUTHENTICATING, "Autoryzacja użytkownika"],
    [
      Status.GOOGLE_AUTHENTICATING_ERROR,
      <button onClick={login.process.setIdle}>
        Błąd autoryzacji użytkownika
      </button>,
    ],
    [Status.VERIFYING, "Weryfikacja użytkownika"],
    [
      Status.VERIFYING_ERROR,
      <button onClick={login.process.setIdle}>
        Błąd weryfikacji użytkownika
      </button>,
    ],
    [Status.SIGNING_IN, "Logowanie użytkownika"],
    [
      Status.SIGNING_IN_ERROR,
      <button onClick={login.process.setIdle}>
        Błąd logowania użytkownika
      </button>,
    ],
    [Status.SIGNED_IN, "Zalogowano"],
  ]);

const useLoginSteps = (login: Login) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const STEPS = useMemo(() => createSteps(login), []);

  return STEPS;
};

export default useLoginSteps;
