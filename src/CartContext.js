import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Task Requirement 3: Add element or increase quantity if it exists
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.title === item.title);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove element completely from the cart state
  const removeItemFromCart = (titleToRemove) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.title !== titleToRemove));
  };

  return React.createElement(
  CartContext.Provider,
  { value: { cartItems, addItemToCart, removeItemFromCart } },
  children
);
};