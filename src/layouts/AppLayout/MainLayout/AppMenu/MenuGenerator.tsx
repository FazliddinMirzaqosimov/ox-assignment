import { Divider, Menu } from "antd";
import { useJWTAuth } from "../../../../auth/jwt-auth/JWTAuthAuthProvider";
import {
  adminMenuRoutes,
  ChildrenType,
  MenuRoutesType,
  userMenuRoutes,
} from "../../../../pages/menuRoutes";
import React from "react";
import { Link } from "react-router-dom";

const renderMenuItem = (item: ChildrenType) => {
  console.log(item.id);

  return (
    <Menu.Item key={item.id} icon={item.icon}>
      <Link to={item.link} style={{ margin: "10px 20px" }}>
        {item.title}
      </Link>
    </Menu.Item>
  );
};

const renderMenu = (item: MenuRoutesType) => {
  return item.type === "group" ? (
    <Menu.ItemGroup
      key={item.name}
      title={
        <Divider orientation="left" style={{ padding: 0, margin: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 400 }}>{item.name}</p>
        </Divider>
      }
    >
      {item.children.map(renderMenuItem)}
    </Menu.ItemGroup>
  ) : (
    <Menu.Item key={item.id}></Menu.Item>
  );
};
function MenuGenerator() {
  const { user } = useJWTAuth();

  const routes = user?.role === "admin" ? adminMenuRoutes : userMenuRoutes;
  return <>{routes.map(renderMenu)}</>;
}

export default MenuGenerator;
