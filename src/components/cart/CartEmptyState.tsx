"use client";

import React, { memo, useCallback } from "react";
import Link from "next/link";

/**
 * 🛍️ CartEmptyState — Displayed when the cart has no items
 * - Accessible and keyboard-friendly
 * - Memoized for performance
 */
interface CartEmptyStateProps {
  onClose?: () => void;
}

const CartEmptyState: React.FC<CartEmptyStateProps> = memo(({ onClose }) => {
  const handleContinueShopping = useCallback(() => {
    onClose?.(); // concise optional chaining
  }, [onClose]);

  return (
    <section
      role="region"
      aria-label="Empty cart message"
      className="flex flex-col items-center justify-center py-10 text-center select-none"
    >
      <p className="text-base text-muted-foreground mb-5">
        Your cart is empty.
      </p>
      <Link
        href="/"
        onClick={handleContinueShopping}
        prefetch
        className="inline-flex items-center justify-center rounded-md border px-5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
        aria-label="Continue shopping"
      >
        Continue Shopping
      </Link>
    </section>
  );
});

CartEmptyState.displayName = "CartEmptyState";

export default CartEmptyState;
