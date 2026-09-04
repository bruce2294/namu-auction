'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuctionItem } from '../types/auction';

interface CartContextType {
  cartItems: AuctionItem[];
  addToCart: (item: AuctionItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<AuctionItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 로컬 스토리지 초기화 (클라이언트 마운트 시)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('namu_auction_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
  }, []);

  // 장바구니 변경 시 저장
  useEffect(() => {
    try {
      localStorage.setItem('namu_auction_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cartItems]);

  const addToCart = (item: AuctionItem) => {
    setCartItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
    setIsCartOpen(true); // 담으면 장바구니 드로어 자동 오픈 (쇼핑몰 UX)
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (itemId: string) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
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
