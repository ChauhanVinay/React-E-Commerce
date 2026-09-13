import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./store/AuthContext";

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
});

export const sanitizeEmail = (email) => {
  if (!email) return "";
  return email.replace(/[@.]/g, "");
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const authCtx = useContext(AuthContext);

  const sanitizedEmail = authCtx.email ? sanitizeEmail(authCtx.email) : "";
  const baseUrl = "https://6aa61b30d7765db985072f37.mockapi.io/cart";

  // 1. Fetch user-specific cart on login or user switch
  useEffect(() => {
    if (!authCtx.email) {
      setCartItems([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`${baseUrl}?email=${sanitizedEmail}`);

        if (!response.ok) {
          throw new Error("Failed to fetch cart from server.");
        }

        const data = await response.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    fetchCart();
  }, [authCtx.email, sanitizedEmail]);

  // 2. Add or increment an item in the cart
  const addItemToCart = async (item) => {
    if (!authCtx.email) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      // Look up by original product identifier or title
      const existingItem = cartItems.find(
        (cartItem) =>
          cartItem.productId === (item.id || item.productId) ||
          cartItem.title === item.title
      );

      if (existingItem) {
        // Increment quantity via PUT
        const updatedQuantity = Number(existingItem.quantity) + 1;
        const response = await fetch(`${baseUrl}/${existingItem.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...existingItem,
            quantity: updatedQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to update item quantity.");
        }

        const updatedData = await response.json();
        setCartItems((prev) =>
          prev.map((i) => (i.id === existingItem.id ? updatedData : i))
        );
      } else {
        // Create a new cart entry via POST
        const response = await fetch(baseUrl, {
          method: "POST",
          body: JSON.stringify({
            productId: item.id || item.productId,
            title: item.title,
            price: item.price,
            imageUrl: item.imageUrl,
            quantity: 1,
            email: sanitizedEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to add item to cart.");
        }

        const data = await response.json();
        setCartItems((prev) => [...prev, data]);
      }
    } catch (err) {
      console.error("Add item error:", err);
      alert("Could not update the cart. Please try again.");
    }
  };

  // 3. Remove an item by MockAPI database ID
  const removeItemFromCart = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item from server.");
      }

      setCartItems((prev) =>
        prev.filter((item) => String(item.id) !== String(id))
      );
    } catch (err) {
      console.error("Remove item error:", err);
      alert("Could not remove item from cart. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};