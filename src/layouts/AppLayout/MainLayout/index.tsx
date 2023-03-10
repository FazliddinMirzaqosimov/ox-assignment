import React, { useState } from "react";
import { Layout } from "antd";
import NavBar from "./NavBar";
import Component from "./Component";
import AppMenu from "./AppMenu";

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Layout style={{ height: "100vh" }}>
      <AppMenu {...{ open, setOpen }} />

      <NavBar {...{ open, setOpen }} />

      <Component />
    </Layout>
  );
};

export default MainLayout;
