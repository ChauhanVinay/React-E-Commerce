import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { CartProvider } from './CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function StoreApp() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div style={{ fontFamily: 'Segoe UI', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header onShowCart={() => setShowCart(true)} />
      
      <div className="bg-secondary text-white text-center py-5" style={{ backgroundColor: '#777' }}>
        <h1 className="display-1 fw-bold m-0" style={{ fontSize: '5rem' }}>The Generics</h1>
      </div>

      <ProductList onShowCart={() => setShowCart(true)} />

      <Cart show={showCart} onHide={() => setShowCart(false)} />

      <footer className="bg-info text-white py-4 mt-5">
        <Container>
          <h1 className="m-0 display-4 fw-bold">The Generics</h1>
        </Container>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}