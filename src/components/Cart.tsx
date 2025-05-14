"use client"

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from '@/store/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const totalAmount = cartItems.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map((item:any) => (
            <Card key={item.id} className="flex flex-col md:flex-row">
              <CardContent className="flex flex-col md:flex-row md:items-center">
                <img src={item.image} alt={item.title} className="w-32 h-32 object-cover mr-4" />
                <div className="flex flex-col">
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <div className="flex items-center mt-2">
                    <Button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button onClick={() => handleRemoveItem(item.id)} className="bg-red-500 text-white">
                  Remove
                </Button>
                <p className="font-bold">Subtotal: ${item.price * item.quantity}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total Amount: ${totalAmount}</h2>
          <Button className="mt-4" onClick={() => alert('Proceeding to checkout...')}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;