import { FC, ReactNode, useMemo } from "react";

import Page from "@/features/common/ui/Page";

import LoginWithGoogle from "@/features/login/ui/LoginWithGoogle";
import LoginProcessAnimation from "@/features/login/ui/LoginProcessAnimation";

import useFirebaseLogin from "@/features/login/hooks/useFirebaseLogin";
import { Status } from "@/features/login/hooks/useLoginProcessStatus";

import logo from "@/features/login/assets/logo.svg";

const createSteps = <K, V>(steps: [K, V][]) => new Map<K, V>([...steps]);

const steps: [Status, ReactNode][] = [
  [Status.GOOGLE_AUTHENTICATING, "Autoryzacja użytkownika"],
  [Status.VERIFYING, "Weryfikacja użytkownika"],
  [Status.SIGNING_IN, "Logowanie użytkownika"],
  [Status.SIGNED_IN, "Zalogowano"],
];

const Login: FC = () => {
  const login = useFirebaseLogin();

  const STEPS = useMemo(
    () =>
      createSteps([
        [
          Status.IDLE,
          <LoginWithGoogle
            onClick={login.process.setGoogleAuthenticating}
            onSuccess={login.initialize}
            onError={login.process.setGoogleAuthenticatingError}
          />,
        ],
        ...steps,
      ]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Page
      className="flex h-dvh max-h-dvh flex-col items-center justify-center"
      hasBlur
    >
      <img
        className="size-login-logo mb-10 rounded-full"
        src={logo}
        alt="Muzykuj logo"
      />
      <LoginProcessAnimation
        status={login.process.status}
        labels={STEPS}
        onFinish={login.navigate}
      />
    </Page>
  );
};

export default Login;
