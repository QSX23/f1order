import "./header.css";
import React from "react";
import MenuButton from "../menuButton/menuButton";

function Header(props) {
  return (
    <div className="header">
      <MenuButton />
      <div className="title">{props.page}</div>
    </div>
  );
}

export default Header;
