"use client"

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { HiOutlineTrash } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import GuestCheckoutForm, { GuestCheckoutData } from './checkout/GuestCheckoutForm';
import LoginRegister from './LoginRegister';
import Script from 'next/script';
import { RootState } from "@/store/store";


declare global {
  interface Window {
    Razorpay: any;
  }
}


const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data: session } = useSession();
  const [showGuestCheckout, setShowGuestCheckout] = useState(false);
  const [guestData, setGuestData] = useState<GuestCheckoutData | null>(null);
  const [guestOrderStatus, setGuestOrderStatus] = useState<string | null>(null);
  const [guestOrderError, setGuestOrderError] = useState<string | null>(null);
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<'login-signup' | 'guest'>('login-signup');

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const totalAmount = cartItems.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    setShowCheckoutPopup(true);
    setActiveTab('login-signup');
  };

  const handleGuestCheckout = async (data: GuestCheckoutData) => {
    setGuestData(data);
    setGuestOrderStatus(null);
    setGuestOrderError(null);
    try {
      // const res = await fetch('/api/guest-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...data, cart: cartItems }),
      // });
      // const result = await res.json();
      // if (res.ok && result.success) {
      //   setGuestOrderStatus('Order placed successfully! Order ID: ' + result.orderId);
      //   setShowGuestCheckout(false);
      // Call Stripe session API
      const razorpayRes = await fetch('/api/payment/razorpay/create-order', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ orderId: result.orderId }),
      });
      const razorpayData = await razorpayRes.json();
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Enter the Key
        amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: 'Lazuli By Neha',
        description: 'Test Transaction',
        order_id: razorpayData.id, //This is a sample Order ID. Pass the
        handler: function (response: any) {
          console.log("razorpay id", response.razorpay_payment_id);
          // console.log(response.razorpay_order_id);
          // console.log(response.razorpay_signature)
        },
        prefill: {
          name: "Neha Maurya",
          email: "nehamaurya213@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error('Guest Order Error:', err);
      setGuestOrderError('Failed to place order.');
    }
    // finally {
    //   setShowCheckoutPopup(false);
    // }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex-grow md:w-2/3">
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex items-center bg-white shadow-md rounded-lg p-4">
                <Link href={`${item.type}/collection/${item.collectionType}/${item.slug}`} className="flex items-center flex-grow">
                  <Image src={item.images[0]} alt={item.title} width={100} height={100} className="rounded-md w-auto object-cover" />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                  </div>
                </Link>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <HiOutlineTrash className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="md:w-1/3 mt-6 md:mt-0 md:ml-6">
        {cartItems.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold">Total Amount: ₹{totalAmount.toFixed(2)}</h2>
            <Button type="button" className='w-full mt-4' onClick={handleCheckoutClick}>
              Proceed to Checkout
            </Button>
            {showCheckoutPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
                  <button
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={() => setShowCheckoutPopup(false)}
                  >
                    &times;
                  </button>
                  {/* Tabs */}
                  <div className="flex mb-4 border-b">
                    <button
                      className={`px-4 py-2 font-semibold ${activeTab === 'login-signup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                      onClick={() => setActiveTab('login-signup')}
                    >
                      Login/Signup
                    </button>
                    <button
                      className={`px-4 py-2 font-semibold ml-2 ${activeTab === 'guest' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                      onClick={() => setActiveTab('guest')}
                    >
                      Checkout as Guest
                    </button>
                  </div>
                  {/* Tab Content */}
                  {activeTab === 'login-signup' && (
                    <LoginRegister checkout />
                    // onSuccess={() => setShowCheckoutPopup(false)}
                  )}
                  {activeTab === 'guest' && (
                    <>
                      <GuestCheckoutForm onSubmit={handleGuestCheckout} />
                      {guestOrderError && <div className="text-red-600 mt-2">kkkk{guestOrderError}</div>}
                    </>
                  )}
                </div>
              </div>
            )}
            {guestOrderStatus && <div className="text-green-600 mt-4">lllll{guestOrderStatus}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;