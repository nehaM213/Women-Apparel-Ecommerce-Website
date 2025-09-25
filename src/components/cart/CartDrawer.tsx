"use client"

import React from "react";
import { Drawer, DrawerContent, DrawerClose, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { HiOutlineTrash } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import LoginRegister from "@/components/LoginRegister";
import { useSession } from "next-auth/react";
import Script from "next/script";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onOpenChange }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
  const { data: session, status } = useSession();

  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = React.useState(false);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
  };

  React.useEffect(() => {
    if (status === "authenticated") {
      try {
        if (typeof window !== "undefined" && localStorage.getItem("checkout_after_oauth") === "1") {
          localStorage.removeItem("checkout_after_oauth");
          localStorage.removeItem("checkout_return_url");
          
          // Wait for Razorpay to be loaded
          const checkRazorpay = () => {
            if (razorpayLoaded && window.Razorpay) {
              setTimeout(() => {
                startRazorpay();
              }, 100);
            } else {
              setTimeout(checkRazorpay, 100);
            }
          };
          checkRazorpay();
        }
      } catch {}
    }
  }, [status, razorpayLoaded]);

  const startRazorpay = async () => {
    try {
      if (!razorpayLoaded || !window.Razorpay) {
        console.error('Razorpay not loaded yet');
        return;
      }

      const razorpayRes = await fetch('/api/payment/razorpay/create-order', {
        method: 'POST',
      });
      const razorpayData = await razorpayRes.json();
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: totalAmount * 100,
        currency: "INR",
        name: 'Lazuli By Neha',
        description: 'Checkout',
        order_id: razorpayData.id,
        handler: function (response: any) {
          console.log('Payment successful:', response);
          // Close cart drawer after successful payment
          onOpenChange(false);
        },
        theme: { color: "#3399cc" }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error('Razorpay init error:', err);
    }
  };

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => console.error('Failed to load Razorpay script')}
      />
      
      <Drawer open={open} onOpenChange={onOpenChange} shouldScaleBackground direction="right">
        <DrawerContent className="right-0 left-auto w-full max-w-full sm:w-[90vw] md:w-[28rem] lg:w-[32rem] xl:w-[36rem] shadow-xl">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <DrawerTitle className="text-lg font-semibold">Your Cart</DrawerTitle>
                <DrawerDescription className="sr-only">View and manage items in your shopping cart</DrawerDescription>
              </div>
              <DrawerClose aria-label="Close cart" className="text-xl">✕</DrawerClose>
            </div>

            <div className="flex-1 overflow-auto p-4 pb-6">
              {cartItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex items-center bg-white rounded-md border p-3">
                      <Link href={`${item.type}/collection/${item.collectionType}/${item.slug}`} className="flex items-center flex-grow gap-3 no-underline">
                        <Image src={item.images[0]} alt={item.title} width={72} height={72} className="rounded-md w-18 h-18 object-cover" />
                        <div className="min-w-0">
                          <h3 className="text-sm font-medium truncate max-w-[12rem]">{item.title}</h3>
                          <p className="text-xs text-muted-foreground">₹{item.price}</p>
                        </div>
                      </Link>
                      <div className="flex items-center ml-2">
                        <button
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="ml-3 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-base font-semibold">₹{totalAmount.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleProceedToCheckout}>Proceed to Checkout</Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login or Sign up</DialogTitle>
            <DialogDescription>Login to continue to checkout</DialogDescription>
          </DialogHeader>
          <LoginRegister checkout onSuccess={() => {
            setIsCheckoutOpen(false);
            onOpenChange(false);
          }} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartDrawer; 