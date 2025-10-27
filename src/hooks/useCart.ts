"use client";

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  removeItem,
  updateQuantity,
  clearCart,
  selectCartTotalQuantity,
  selectCartTotalAmount,
} from "@/store/cartSlice";

export interface CartItem {
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
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  ) as CartItem[];
  const totalAmount = useSelector(selectCartTotalAmount);
  const itemCount = useSelector(selectCartTotalQuantity);

  const handleUpdateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity < 1) return;
      dispatch(updateQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      dispatch(removeItem(id));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    // This would need to be implemented in the cart slice
    dispatch(clearCart());
  }, [dispatch]);

  const isEmpty = useMemo(() => cartItems.length === 0, [cartItems]);

  return {
    cartItems,
    totalAmount,
    itemCount,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
    isEmpty,
  };
};
