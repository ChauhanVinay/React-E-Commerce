import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './store/AuthContext';

export const sanitizeEmail = (email) => {
  return email.replace(/[@.]/g, "");
};

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: (item) => {},
  removeItemFromCart: (title) => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const authCtx = useContext(AuthContext);
  
  // Construct URL using your specific API ID
  const sanitizedEmail = authCtx.email ? sanitizeEmail(authCtx.email) : "";
  const baseUrl = `https://crudcrud.com/api/1624946dd02f4a06a65757ca6f62f826/cart${sanitizedEmail}`;

  // GET: Fetch items on load/login
  useEffect(() => {
    if (authCtx.email) {
      fetch(baseUrl)
        .then((res) => res.json())
        .then((data) => setCartItems(data))
        .catch((err) => console.error("Error fetching cart:", err));
    } else {
      setCartItems([]);
    }
  }, [authCtx.email, baseUrl]);

  // POST: Add item to backend
  const addItemToCart = async (item) => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({ ...item, quantity: 1 }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems((prevItems) => [...prevItems, data]);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeItemFromCart = (titleToRemove) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.title !== titleToRemove));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};