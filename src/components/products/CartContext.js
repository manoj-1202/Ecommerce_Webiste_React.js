import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../pages/UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(`${user.email}-cart`)) || [];
      setCart(storedCart);
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user.email}-cart`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    if (!user) {
      return; // User not logged in, do nothing
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, getTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
