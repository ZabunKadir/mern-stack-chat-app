import React,{useState} from "react";
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
const HeaderNotLogin = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="header">
      <Navbar expand="md" className="container">
        <Nav className="col-8">
          <NavbarBrand className="logo" href="/">
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
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="contact">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="sign-up-header" href="signUp">
                Sign Up
              </NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Sign In
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Sign In</DropdownItem>
                <DropdownItem>Sign Up</DropdownItem>
                {/* <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};
export default HeaderNotLogin;
