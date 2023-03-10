import { Divider, Menu } from "antd";
import MenuGenerator from "./MenuGenerator";
import "./menu.style.scss";
import { useJWTAuthActions } from "auth/jwt-auth/JWTAuthAuthProvider";

function AppMenu() {
  const { logout } = useJWTAuthActions();
  console.log(logout);

  return (
    <Menu className="menu" openKeys={["1"]}>
      <MenuGenerator />
      <Menu.ItemGroup
        key={"auth"}
        title={
          <Divider orientation="left" style={{ padding: 0, margin: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 400 }}>{"Auth pages"}</p>
          </Divider>
        }
      >
        <Menu.Item key={"01"} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
}

export default AppMenu;
