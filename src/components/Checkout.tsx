"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Button } from './ui/button';

const Checkout: React.FC = () => {
  const router = useRouter();
  const cartItems = useSelector((state:any) => state.cart.items);

  const totalAmount = cartItems.reduce((total:any, item:any) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // Logic to handle order placement
    // For now, just redirect to a confirmation page or show a success message
    alert('Order placed successfully!');
    router.push('/'); // Redirect to home or confirmation page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty. Please add items to your cart before checking out.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item:any) => (
              <div key={item.id} className="flex items-center border-b py-2">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <h2 className="text-xl font-bold">Total Amount:</h2>
            <p className="text-xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <Button
            onClick={handlePlaceOrder}
            className="mt-4 w-full"
          >
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
