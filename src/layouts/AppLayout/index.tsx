import React from "react";
import { useJWTAuth } from "../../auth/jwt-auth/JWTAuthAuthProvider";
import GuestLayout from "./GuestLayout";
import MainLayout from "./MainLayout";
import "./layout.style.scss";
import { Spin } from "antd";

function AppLayout() {
  const { isAuthenticated, isLoading } = useJWTAuth();
  return (
    <Spin spinning={isLoading}>
      <div className="layout">
        {isAuthenticated ? <MainLayout /> : <GuestLayout />}
      </div>
    </Spin>
  );
}

export default AppLayout;
