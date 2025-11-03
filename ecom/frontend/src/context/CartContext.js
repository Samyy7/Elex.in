import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    alert(product.name + " added to cart!");
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  // --- (NEW) ADD THIS FUNCTION ---
  const clearCart = () => {
    setCart([]);
  };
  // -----------------------------

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart, // --- (NEW) ADD THIS TO THE VALUE ---
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};