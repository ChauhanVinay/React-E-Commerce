import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { CartContext } from "../CartContext";
import { AuthContext } from "../store/AuthContext";

export default function Header({ onShowCart }) {
  const authCtx = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/login");
  };

  const totalQuantity = cartItems
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="sticky-top"
    >
      <Container>
        <Nav className="mx-auto">

          <NavLink
            exact
            to="/"
            className="nav-link text-white"
            activeClassName="active"
          >
            HOME
          </NavLink>

  
            <NavLink
              to="/store"
              className="nav-link text-white"
              activeClassName="active"
            >
              STORE
            </NavLink>
          

          <NavLink
            to="/about"
            className="nav-link text-white"
            activeClassName="active"
          >
            ABOUT
          </NavLink>

          <NavLink
            to="/contact"
            className="nav-link text-white"
            activeClassName="active"
          >
            CONTACT
          </NavLink>

          {!authCtx.isLoggedIn && (
            <NavLink
              to="/login"
              className="nav-link text-white"
              activeClassName="active"
            >
              LOGIN
            </NavLink>
          )}

          {authCtx.isLoggedIn && (
            <Button
              variant="danger"
              className="ms-3"
              onClick={logoutHandler}
            >
              LOGOUT
            </Button>
          )}
        </Nav>

        {authCtx.isLoggedIn && (
          <Button
            variant="outline-info"
            onClick={onShowCart}
          >
            Cart
            <span className="badge bg-info ms-2">
              {totalQuantity}
            </span>
          </Button>
        )}
      </Container>
    </Navbar>
  );
}