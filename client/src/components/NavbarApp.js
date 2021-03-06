import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import { useSelector } from "react-redux";

export default function NavbarApp() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const loggedIn = (
    <>
    <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {isAuthenticated && user ? `Welcome ${user.name}` : ""}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <LogoutModal />
      </NavItem>
      
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={toggleOpen} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? loggedIn : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}
