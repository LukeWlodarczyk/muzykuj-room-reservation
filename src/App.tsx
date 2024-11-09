import Router from "@/router";

import { AuthProvider } from "@/features/common/context/auth";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
