import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import "./navbar.style.scss";

function NavBar({
  setCollapsed,
  collapsed,
}: {
  setCollapsed: any;
  collapsed: boolean;
}) {
  return (
    <nav>
      <AiOutlineMenuFold size={30} onClick={() => setCollapsed(!collapsed)} />

      <h1>Logo</h1>
    </nav>
  );
}

export default NavBar;
