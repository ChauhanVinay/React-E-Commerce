import { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { CartContext } from "../CartContext";


export default function Header({onShowCart}) {
    const { cartItems } = useContext(CartContext);

//Task 4: Dynamically sum items for the badge count

   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

   return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top px-4 py-2 border-bottom border-secondary">
      <Container>
        <Nav className="mx-auto fs-5">
          <Nav.Link href="#home" className="px-3 text-white">HOME</Nav.Link>
          <Nav.Link href="#store" className="px-3 text-white active">STORE</Nav.Link>
          <Nav.Link href="#about" className="px-3 text-white">ABOUT</Nav.Link>
        </Nav>
        <Button variant="outline-info" onClick={onShowCart} className="fw-bold text-white">
          cart <span className="badge bg-info ms-1">{totalQuantity}</span>
        </Button>
      </Container>
    </Navbar>
   );
}