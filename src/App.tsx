import JWTAuthAuthProvider from "auth/jwt-auth/JWTAuthAuthProvider";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <JWTAuthAuthProvider>
        <img src="https://test-object.blr1.cdn.digitaloceanspaces.com/photo_2023-11-07_17-29-43.jpg" alt="lalala"/>
        <AppLayout />
      </JWTAuthAuthProvider>
    </BrowserRouter>
  );
}

export default App;
