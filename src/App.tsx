import { GoogleOAuthProvider } from "@react-oauth/google";

import config from "@/config";

import Router from "@/router";

import { AuthProvider } from "@/context/auth";

function App() {
  return (
    <GoogleOAuthProvider clientId={config.google.oAuthClientId}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
