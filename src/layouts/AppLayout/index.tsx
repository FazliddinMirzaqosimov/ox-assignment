import React from "react";
import { useJWTAuth } from "../../auth/jwt-auth/JWTAuthAuthProvider";
import GuestLayout from "./GuestLayout";
import MainLayout from "./MainLayout";

function AppLayout() {
  const { isAuthenticated } = useJWTAuth();
  return isAuthenticated ? <GuestLayout /> : <MainLayout />;
}

export default AppLayout;
