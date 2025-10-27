"use client";

import React, { FC, useCallback, useState } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoginRegister from "@/components/auth/LoginRegister";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import CartHeader from "./CartHeader";
import CartEmptyState from "./CartEmptyState";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer: FC<CartDrawerProps> = React.memo(({ open, onOpenChange }) => {
  const { cartItems, totalAmount, itemCount, updateQuantity, removeItem, isEmpty } = useCart();
  const { status } = useSession();
  const router = useRouter();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleProceedToCheckout = useCallback(async () => {
    if (status === "authenticated") {
      onOpenChange(false);
      router.push(`/checkout`);
      return;
    }
    setIsCheckoutOpen(true);
  }, [status, onOpenChange, router]);

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange} direction="right">
        <DrawerContent
          className="right-0 left-auto w-full max-w-full sm:w-[90vw] md:w-[28rem] lg:w-[32rem] xl:w-[36rem] shadow-xl"
          aria-modal="true"
        >
          <div className="h-full flex flex-col">
            <CartHeader itemCount={itemCount} />
            <div
              className="flex-1 overflow-auto p-4 pb-6"
              role="region"
              aria-label="Cart items"
              aria-live="polite"
            >
              {isEmpty ? (
                <CartEmptyState onClose={() => onOpenChange(false)} />
              ) : (
                <div className="space-y-4" role="list" aria-label="Cart items list">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeItem}
                    />
                  ))}
                </div>
              )}
            </div>
            {!isEmpty && (
              <CartFooter
                totalAmount={totalAmount}
                onCheckout={handleProceedToCheckout}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent aria-modal="true">
          <DialogHeader>
            <DialogTitle>Login or Sign up</DialogTitle>
            <DialogDescription>Login to continue to checkout</DialogDescription>
          </DialogHeader>
          <LoginRegister
            checkout
            onSuccess={() => {
              setIsCheckoutOpen(false);
              onOpenChange(false);
              router.push("/checkout");
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
});

CartDrawer.displayName = "CartDrawer";

export default CartDrawer;
