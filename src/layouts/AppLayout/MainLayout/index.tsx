import React, { useState } from "react";
import { Layout } from "antd";
import NavBar from "./NavBar";
import Component from "./Component";
import AppMenu from "./AppMenu";

const { Sider } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  console.log(collapsed);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={200}
        style={{ background: "white" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <AppMenu />
      </Sider>
      <Layout>
        <NavBar {...{ collapsed, setCollapsed }} />
        <Layout>
          <Component />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
