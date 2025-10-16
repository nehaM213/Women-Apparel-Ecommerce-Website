"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { useCallback, useMemo } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  images: string[];
  type: string;
  collectionType: string;
  slug: string;
}

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];
  
  const totalAmount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const itemCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  }, [dispatch]);

  const handleRemoveItem = useCallback((id: string) => {
    dispatch(removeItem(id));
  }, [dispatch]);

  const clearCart = useCallback(() => {
    // This would need to be implemented in the cart slice
    // dispatch(clearCart());
  }, [dispatch]);

  return {
    cartItems,
    totalAmount,
    itemCount,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart,
    isEmpty: cartItems.length === 0
  };
};
