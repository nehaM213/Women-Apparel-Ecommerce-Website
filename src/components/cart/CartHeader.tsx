"use client";

import React from "react";
import { DrawerClose, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";

interface CartHeaderProps {
  itemCount: number;
}

const CartHeader: React.FC<CartHeaderProps> = React.memo(({ itemCount }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <DrawerTitle className="text-lg font-semibold">
          Your Cart {itemCount > 0 && `(${itemCount})`}
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          View and manage items in your shopping cart
        </DrawerDescription>
      </div>
      <DrawerClose aria-label="Close cart" className="text-xl">
        ✕
      </DrawerClose>
    </div>
  );
});

CartHeader.displayName = 'CartHeader';

export default CartHeader;
