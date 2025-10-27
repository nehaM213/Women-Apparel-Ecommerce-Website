"use client";

import React, { memo } from "react";
import {
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface CartHeaderProps {
  itemCount: number;
}

/**
 * 🛒 CartHeader — Displays cart title and close button inside the drawer
 * - Memoized for performance
 * - Accessible with semantic and aria labels
 */
const CartHeader: React.FC<CartHeaderProps> = memo(({ itemCount }) => {
  const itemLabel = itemCount === 1 ? "item" : "items";

  return (
    <header
      className="flex items-center justify-between p-4 border-b"
      role="banner"
      aria-label="Cart header"
    >
      <div>
        <DrawerTitle
          asChild
          className="text-lg font-semibold leading-none tracking-tight"
        >
          <h2>
            Your Cart{" "}
            {itemCount > 0 && (
              <span className="text-muted-foreground text-sm font-normal">
                ({itemCount} {itemLabel})
              </span>
            )}
          </h2>
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          View and manage items in your shopping cart
        </DrawerDescription>
      </div>

      <DrawerClose
        aria-label="Close cart"
        className="text-xl leading-none hover:opacity-80 transition-opacity"
      >
        ✕
      </DrawerClose>
    </header>
  );
});

CartHeader.displayName = "CartHeader";

export default CartHeader;
