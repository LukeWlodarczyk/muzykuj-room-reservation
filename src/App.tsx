import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "@/pages/Login";

import config from "@/config";
import { AuthProvider } from "@/context/auth";

function App() {
  return (
    <GoogleOAuthProvider clientId={config.google.oAuthClientId}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
