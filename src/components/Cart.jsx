import React, { useContext } from 'react';
import { Offcanvas, Table, Button } from 'react-bootstrap';
import { CartContext } from '../CartContext';

export default function Cart({ show, onHide }) {
  const { cartItems, removeItemFromCart } = useContext(CartContext);

  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" scroll={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold font-monospace fs-2 text-center w-100">CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <p className="text-center text-muted my-4">Your cart is empty.</p>
        ) : (
          <>
            <Table borderless className="align-middle">
              <thead>
                <tr className="border-bottom border-dark text-secondary">
                  <th style={{ width: '40%' }}>ITEM</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3">
                      <div className="d-flex flex-column align-items-start">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                          className="mb-1" 
                        />
                        <span className="fw-medium small text-truncate" style={{ maxWidth: '100px' }}>{item.title}</span>
                      </div>
                    </td>
                    <td className="fs-6">${item.price}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="border border-info text-center px-2 py-1 rounded me-2" style={{ minWidth: '35px' }}>
                          {item.quantity}
                        </span>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          className="fw-bold p-1" 
                          style={{ fontSize: '0.75rem' }} 
                          onClick={() => removeItemFromCart(item.title)}
                        >
                          REMOVE
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end align-items-center mt-4 fs-4 fw-bold">
              <span className="me-3">Total</span>
              <span>${totalCartPrice}</span>
            </div>
            <div className="text-center mt-4">
              <Button variant="info" className="text-white fw-bold px-4 py-2">PURCHASE</Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}