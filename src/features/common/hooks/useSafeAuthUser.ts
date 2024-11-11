import { useAuthContext } from "../context/auth";

const useSafeAuthUser = () => {
  const { user } = useAuthContext();

  if (!user) {
    throw new Error("useSafeAuthUser must be used within a Autheticated route");
  }

  return user;
};

export default useSafeAuthUser;
