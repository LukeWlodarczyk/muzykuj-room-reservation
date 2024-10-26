import { useState } from "react";

enum Status {
  IDLE = "IDLE",
  GOOGLE_AUTHENTICATING = "GOOGLE_AUTHENTICATING",
  GOOGLE_AUTHENTICATING_ERROR = "GOOGLE_AUTHENTICATING_ERROR",
  VERIFYING = "VERIFYING",
  VERIFYING_ERROR = "VERIFYING_ERROR",
  SIGNING_IN = "SIGNING_IN",
  SIGNING_IN_ERROR = "SIGNING_IN_ERROR",
  SIGNED_IN = "SIGNED_IN",
}

const useLoginProcessStatus = () => {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  return {
    status,
    setIdle: () => setStatus(Status.IDLE),
    setGoogleAuthenticating: () => setStatus(Status.GOOGLE_AUTHENTICATING),
    setGoogleAuthenticatingError: () =>
      setStatus(Status.GOOGLE_AUTHENTICATING_ERROR),
    setVerifying: () => setStatus(Status.VERIFYING),
    setVerifyingError: () => setStatus(Status.VERIFYING_ERROR),
    setSigningIn: () => setStatus(Status.SIGNING_IN),
    setSigningInError: () => setStatus(Status.SIGNING_IN_ERROR),
    setSignedIn: () => setStatus(Status.SIGNED_IN),
  };
};

export default useLoginProcessStatus;
