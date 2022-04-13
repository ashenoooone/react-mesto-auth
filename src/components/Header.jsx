import React from "react";
import headerLogo from "../images/logo.svg";
function Header() {
  return (
    <header className="header page__header">
      <img src={headerLogo} alt="логотип" className="logo" />
    </header>
  );
}
export default Header;
