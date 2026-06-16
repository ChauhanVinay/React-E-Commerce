import React, { useState } from 'react';
import { Container, Navbar, Button, Table } from 'react-bootstrap';

// 1. Hardcoded cartElements array exactly as specified
const initialCartElements = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 2,
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 3,
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    quantity: 1,
  }
];

function App() {
  // State to control visibility of the cart section
  const [showCart, setShowCart] = useState(false);
  
  // State to manage the cart items so they can be removed
  const [cartItems, setCartItems] = useState(initialCartElements);

  // Function to remove an item from the cart state
  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
  };

  // Calculate the total cart price dynamically
  const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      
      {/* TOP NAVBAR WITH CART TOGGLE BUTTON */}
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-between px-5 py-2 sticky-top">
        <Navbar.Brand className="fw-bold fs-4">The Generics</Navbar.Brand>
        <Button 
          variant="outline-info" 
          onClick={() => setShowCart(!showCart)} 
          className="fw-bold text-white"
        >
          cart <span className="badge bg-info ms-1">{totalQuantity}</span>
        </Button>
      </Navbar>

      {/* HERO BANNER SECTION */}
      <div className="bg-secondary text-white text-center py-5" style={{ backgroundColor: '#777' }}>
        <h1 className="display-1 fw-bold m-0" style={{ fontSize: '5rem' }}>The Generics</h1>
      </div>

      {/* TRIGGER BUTTON TO OPEN CART */}
      {!showCart && (
        <div className="text-center my-5">
          <Button 
            variant="secondary" 
            className="fw-bold px-4 py-2 bg-dark text-info border-0"
            onClick={() => setShowCart(true)}
          >
            See the cart
          </Button>
        </div>
      )}

      {/* CART SECTION (Conditional Rendering based on state) */}
      {showCart && (
        <Container className="py-5 my-4" style={{ maxWidth: '700px' }}>
          <h2 className="text-center mb-4 fw-bold font-monospace fs-1">CART</h2>
          
          {cartItems.length === 0 ? (
            <p className="text-center text-muted my-4">Your cart is currently empty.</p>
          ) : (
            <>
              <Table borderless className="align-middle">
                <thead>
                  <tr className="border-bottom border-dark fs-5 text-secondary">
                    <th style={{ width: '50%' }}>ITEM</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }} 
                            className="me-3"
                          />
                          <span className="fw-medium">{item.title}</span>
                        </div>
                      </td>
                      <td className="fs-5">${item.price}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="border border-info text-center px-2 py-1 rounded me-3" style={{ minWidth: '40px' }}>
                            {item.quantity}
                          </span>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            className="fw-bold"
                            onClick={() => handleRemoveItem(index)}
                          >
                            REMOVE
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* TOTAL DISPLAY */}
              <div className="d-flex justify-content-end align-items-center mt-4 fs-4 fw-bold">
                <span className="me-3">Total</span>
                <span>${totalCartPrice}</span>
              </div>

              {/* PURCHASE TRIGGER BUTTON */}
              <div className="text-center mt-4">
                <Button variant="info" className="text-white fw-bold px-4 py-2">
                  PURCHASE
                </Button>
              </div>
            </>
          )}
        </Container>
      )}

      {/* BOTTOM FOOTER BRANDING */}
      <footer className="bg-info text-white py-4 fixed-bottom" style={{ zIndex: -1 }}>
        <Container>
          <h1 className="m-0 display-4 fw-bold">The Generics</h1>
        </Container>
      </footer>

    </div>
  );
}

export default App;