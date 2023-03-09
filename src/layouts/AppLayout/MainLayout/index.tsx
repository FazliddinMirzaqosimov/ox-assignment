import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={200} style={{ background: "white" }}></Sider>
      <Layout>
        <nav>weweewwe</nav>
        <Layout>
          <Content
            style={{
              background: "white",
              overflow: "auto",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
