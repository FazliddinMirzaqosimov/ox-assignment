import React, { useState } from "react";
import { Layout } from "antd";
import NavBar from "./NavBar";
import AppMenu from "./AppMenu";
import Content from "./Content";

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Layout style={{ height: "100vh" }}>
      <AppMenu {...{ open, setOpen }} />

      <NavBar {...{ open, setOpen }} />

      <Content />
    </Layout>
  );
};

export default MainLayout;
