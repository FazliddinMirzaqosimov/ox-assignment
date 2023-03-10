import JWTAuthAuthProvider from "auth/jwt-auth/JWTAuthAuthProvider";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <JWTAuthAuthProvider>
        <AppLayout />
      </JWTAuthAuthProvider>
    </BrowserRouter>
  );
}

export default App;
