import React, { useEffect, useState } from "react";
import "../styles/components/header.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {far,faUser,faComments} from "@fortawesome/free-regular-svg-icons"
import{ faSignOutAlt} from "@fortawesome/free-solid-svg-icons"
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
} from "reactstrap";
import axios from "axios";
import Login from "./login";
import { Link, useHistory } from "react-router-dom";
const HeaderLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const userInfo = localStorage.getItem("userInfo");
  const user= JSON.parse(userInfo);
  const history = useHistory();

  const refreshPage = () => {
    window.location.reload();
  };
  const Logout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/");
    refreshPage();
  };
  return (
    <div className="header">
      <Navbar expand="md" className="container">
        <Nav className="col-8">
          <NavbarBrand className="logo" href="/messenger">
            CHAT APP
          </NavbarBrand>
        </Nav>
        <NavbarToggler
          navbar="true"
          navbar-light="true"
          bg-light="true"
          onClick={toggle}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="col-4 nav-links" navbar>
          <NavItem>
              <NavLink href="/messenger"><FontAwesomeIcon className="fa-chat-icon" icon={faComments}></FontAwesomeIcon>Chat</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user.name+' '+ user.surname}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><Link to="/profile"><FontAwesomeIcon className="fa-icon" icon={faUser}/>Profile</Link></DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={Logout}><FontAwesomeIcon className="fa-icon" icon={faSignOutAlt}/>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default HeaderLogin;
