"use client";

import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import LoginRegister from "@/components/LoginRegister";
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

const CartDrawer: React.FC<CartDrawerProps> = React.memo(({ open, onOpenChange }) => {
  const { cartItems, totalAmount, itemCount, updateQuantity, removeItem, isEmpty } = useCart();
  const { status } = useSession();
  const router = useRouter();
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const handleProceedToCheckout = React.useCallback(async () => {
    if (status === "authenticated") {
      try {
        onOpenChange(false);
        router.push(`/checkout`);
        return;
      } catch (e) {
        console.error("Navigate to checkout failed", e);
        return;
      }
    }
    setIsCheckoutOpen(true);
  }, [status, onOpenChange, router]);

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        direction="right"
      >
        <DrawerContent className="right-0 left-auto w-full max-w-full sm:w-[90vw] md:w-[28rem] lg:w-[32rem] xl:w-[36rem] shadow-xl">
          <div className="h-full flex flex-col">
            <CartHeader itemCount={itemCount} />

            <div className="flex-1 overflow-auto p-4 pb-6" role="region" aria-label="Cart items">
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
        <DialogContent>
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

CartDrawer.displayName = 'CartDrawer';

export default CartDrawer;
