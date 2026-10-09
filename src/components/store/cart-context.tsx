'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, StoreProduct, LicenseType } from '@/types/store';
import { calculateProductPrice } from '@/lib/store';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: StoreProduct, license?: LicenseType) => void;
  removeFromCart: (productId: string, license: LicenseType) => void;
  updateQuantity: (productId: string, license: LicenseType, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartHydrated, setIsCartHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('playful_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    } finally {
      setIsCartHydrated(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isCartHydrated) {
      return;
    }

    try {
      localStorage.setItem('playful_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, isCartHydrated]);

  const addToCart = (product: StoreProduct, license: LicenseType = 'Personal') => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.license === license
      );
      const price = calculateProductPrice(product.price, license);

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.license === license
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, license, price, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, license: LicenseType) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.license === license))
    );
  };

  const updateQuantity = (productId: string, license: LicenseType, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, license);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.license === license
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
