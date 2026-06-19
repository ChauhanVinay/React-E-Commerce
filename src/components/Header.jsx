import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CartContext } from "../CartContext";

export default function Header({ onShowCart }) {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top px-4 py-2 border-bottom border-secondary">
      <Container>
        <Nav className="mx-auto fs-5 align-items-center">
          <NavLink
           to="/"
           className={({ isActive }) => isActive ? "nav-link px-3 text-white active" : "nav-link px-3 text-white"}
          >
          HOME
          </NavLink>

          <NavLink 
            to="/store" 
            className={({ isActive }) => isActive ? "nav-link px-3 text-white active" : "nav-link px-3 text-white"}
          >
            STORE
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "nav-link px-3 text-white active" : "nav-link px-3 text-white"}
          >
            ABOUT
          </NavLink>
          <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? "nav-link px-3 text-white active" : "nav-link px-3 text-white"}
          >
            CONTACT
          </NavLink>
        </Nav>
        <Button variant="outline-info" onClick={onShowCart} className="fw-bold text-white">
          cart <span className="badge bg-info ms-1">{totalQuantity}</span>
        </Button>
      </Container>
    </Navbar>
  );
}