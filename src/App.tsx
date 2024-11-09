import Router from "@/router";

import { AuthProvider } from "@/context/auth";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
