import { createContext, useContext, FC, ReactNode } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/services/firebase/auth";

type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  error?: Error;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
