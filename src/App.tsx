import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";

import config from "./config";

function App() {
  return (
    <GoogleOAuthProvider clientId={config.google.OAUTH_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
