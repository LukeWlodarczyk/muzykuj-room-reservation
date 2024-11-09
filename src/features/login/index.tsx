import Login from "./page";

import { GoogleOAuthProvider } from "./context";

const ProvidedLogin = () => (
  <GoogleOAuthProvider>
    <Login />
  </GoogleOAuthProvider>
);

export default ProvidedLogin;
