"use client"

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { HiOutlineTrash } from 'react-icons/hi';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  console.log("cartItems",cartItems);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const totalAmount = cartItems.reduce((total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="flex-grow md:w-2/3">
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item:any) => (
              <div key={item.id} className="flex items-center bg-white shadow-md rounded-lg p-4">
                <Link href={`${item.type}/collection/${item.collectionType}/${item.slug}`} className="flex items-center flex-grow">
                  <Image src={item.images[0]} alt={item.title} width={100} height={100} className="rounded-md w-auto" />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600">Price: ${item.price}</p>
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
            <h2 className="text-2xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h2>
            <Link href="/checkout">
              <Button type="button" className='w-full mt-4' >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;