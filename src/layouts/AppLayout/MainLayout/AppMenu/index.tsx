import { Divider, Drawer } from "antd";
import MenuGenerator from "./MenuGenerator";
import "./menu.style.scss";
import { useJWTAuthActions } from "auth/jwt-auth/JWTAuthAuthProvider";
import { NavLink } from "react-router-dom";
type PropType = {
  open: boolean;
  setOpen: (a: boolean) => void;
};

function AppMenu({ open, setOpen }: PropType) {
  const { logout } = useJWTAuthActions();
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      title="Menu"
      placement={"left"}
      closable={false}
      onClose={onClose}
      open={open}
      key={"left"}
      width={240}
    >
      {" "}
      <div className="menu" onClick={() => setOpen(false)}>
        <MenuGenerator />

        <Divider orientation="left">
          <p style={{ fontSize: 12, fontWeight: 400 }}>{"Auth pages"}</p>
        </Divider>
        <NavLink to="/">
          <div className="menu-item" onClick={logout}>
            Logout
          </div>
        </NavLink>
      </div>
    </Drawer>
  );
}

export default AppMenu;
