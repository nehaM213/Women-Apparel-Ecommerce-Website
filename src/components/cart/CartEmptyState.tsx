"use client";

import React from "react";
import Link from "next/link";

interface CartEmptyStateProps {
  onClose?: () => void;
}

const CartEmptyState: React.FC<CartEmptyStateProps> = React.memo(({ onClose }) => {
  const handleContinueShopping = React.useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <p className="text-sm text-muted-foreground mb-4">
        Your cart is empty.
      </p>
      <Link 
        href="/" 
        onClick={handleContinueShopping}
        className="inline-block border rounded px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  );
});

CartEmptyState.displayName = 'CartEmptyState';

export default CartEmptyState;
