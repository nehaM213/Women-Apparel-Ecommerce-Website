"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CART_CONSTANTS } from "./constants";

interface CartFooterProps {
  totalAmount: number;
  onCheckout: () => void;
}

const CartFooter: React.FC<CartFooterProps> = React.memo(({ 
  totalAmount, 
  onCheckout 
}) => {
  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">Subtotal</span>
        <span className="text-base font-semibold" aria-live="polite">
          ₹{totalAmount.toFixed(2)}
        </span>
      </div>
      <Button className={CART_CONSTANTS.BUTTON_CLASSES.CHECKOUT} onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
});

CartFooter.displayName = 'CartFooter';

export default CartFooter;
