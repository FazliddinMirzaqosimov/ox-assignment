import { Card } from "antd";
import React from "react";

type PropType = { children: React.ReactNode };

function AuthWrapper({ children }: PropType) {
  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       }}
    >
      {children}
    </Card>
  );
}

export default AuthWrapper;
