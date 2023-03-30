import { Divider, Menu } from "antd";

import {
  adminMenuRoutes,
  ChildrenType,
  MenuRoutesType,
} from "../../../../pages/menuRoutes";
import { NavLink } from "react-router-dom";

const renderMenuItem = (item: ChildrenType) => {
  return (
    <NavLink key={item.id} to={item.link} style={{ padding: 0, margin: 0 }}>
      <div className="menu-item">
        {item.icon} - {item.title}
      </div>
    </NavLink>
  );
};

const renderMenu = (item: MenuRoutesType) => {
  return item.type === "group" ? (
    <>
      <Divider orientation="left">
        <p style={{ fontSize: 12, fontWeight: 400 }}>{item.name}</p>
      </Divider>

      {item.children.map(renderMenuItem)}
    </>
  ) : (
    <Menu.Item key={item.id}></Menu.Item>
  );
};
function MenuGenerator() {
  return <>{adminMenuRoutes.map(renderMenu)}</>;
}

export default MenuGenerator;
