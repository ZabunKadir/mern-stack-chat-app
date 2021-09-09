import React, { useState, useEffect } from "react";
import "../styles/components/header.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import HeaderLogin from "./headerLogin";
import HeaderNotLogin from "./headerNotLogin";
import { useHistory } from "react-router-dom";
const menu = {
  login: [
    {
      key: "home",
      href: "/home",
      label: "Home"
    },
    {
      key: "contact",
      href: "/contact",
      label: "Contact"
    }
  ],
  notLogin: [
    {
      key: "home",
      href: "/",
      label: "Home"
    },
    {
      key: "contact",
      href: "/",
      label: "Contact"
    }
  ]
}
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return (
    <div className="header">
      {/* {menu[isLogin ? "login" : "notLogin"].map(item=>
       <NavItem>
       <NavLink href={item.href}>{item.label}</NavLink>
     </NavItem>
        )} */}
      {isLogin ? (
        <HeaderLogin></HeaderLogin>
      ) : (
        <HeaderNotLogin></HeaderNotLogin>
      )}
    </div>
  );
};

export default Header;
