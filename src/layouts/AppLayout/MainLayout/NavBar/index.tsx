import React from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import "./navbar.style.scss";

type PropType = {
  setOpen: (a: boolean) => void;
  open: boolean;
};
function NavBar({ open, setOpen }: PropType) {
  return (
    <nav>
      <AiOutlineMenuFold size={30} onClick={() => setOpen(!open)} />

      <h1>Logo</h1>
    </nav>
  );
}

export default NavBar;
