import { FC } from "react";

import Page from "@/features/common/ui/Page";

import LoginProcessAnimation from "@/features/login/ui/LoginProcessAnimation";
import Logo from "@/features/login/ui//Logo";

import useFirebaseLogin from "@/features/login/hooks/useFirebaseLogin";
import useLoginSteps from "@/features/login/hooks/useLoginSteps";

const Login: FC = () => {
  const login = useFirebaseLogin();

  const STEPS = useLoginSteps(login);

  return (
    <Page
      className="flex h-dvh max-h-dvh flex-col items-center justify-center p-4"
      hasBlur
    >
      <Logo className="mb-10" />
      <LoginProcessAnimation
        status={login.process.status}
        labels={STEPS}
        onFinish={login.navigate}
      />
    </Page>
  );
};

export default Login;
