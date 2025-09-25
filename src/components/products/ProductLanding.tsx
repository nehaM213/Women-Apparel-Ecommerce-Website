"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductDetails {
  title: string;
  price: number;
  // brand: string;
  images: string[];
  // status: string;
}

const ProductLanding = ({ productDetails }: { productDetails: ProductDetails }) => {
  // console.log(productDetails);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - replace with actual data from your backend
  const product: ProductDetails = {
    title: productDetails.title,
    price: productDetails.price,
    // brand: "BASHOBYLA",
    // status: "Ready to ship",
    images: productDetails.images,
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
            <Image 
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 30vw"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 aspect-[3/4] rounded-md overflow-hidden relative ${
                  selectedImage === index ? 'border-2 border-blue-500' : ''
                }`}
              >
                <Image 
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {/* <p className="text-sm text-gray-500 uppercase">{product.brand}</p> */}
            <h1 className="text-2xl font-medium text-gray-900 mt-1">{product.title}</h1>
            {/* <p className="text-sm text-gray-500 mt-2">{product.status}</p> */}
          </div>

          <p className="text-xl font-medium">Rs. {product.price.toFixed(2)} INR</p>
          <p className="text-sm text-gray-500">Tax included. Shipping calculated at checkout.</p>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">Quantity</label>
            <div className="flex items-center border rounded-md w-32">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-2 border-r hover:bg-gray-50"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full text-center focus:outline-none"
                min="1"
              />
              <button 
                onClick={increaseQuantity}
                className="px-3 py-2 border-l hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Add to cart
            </button>
            <button className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-[#343332]">
              Buy it now
            </button>
          </div>

          {/* Whatsapp Support */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>💕</span>
            <p>For any assistance Please Connect with Us On</p>
            <a href="#" className="text-blue-600 underline">Whatsapp</a>
          </div>

          {/* Collapsible Sections */}
          <div className="border-t pt-6 space-y-4">
            {['Specification', 'Description', 'Care Instructions', 'Size Guide', 'Shipping', 'Returns & Exchange'].map((section) => (
              <details key={section} className="border-b pb-4">
                <summary className="flex justify-between items-center cursor-pointer">
                  <span className="text-sm font-medium">{section}</span>
                  <span className="text-gray-500">+</span>
                </summary>
                <div className="mt-4 text-sm text-gray-600">
                  {/* Add content for each section */}
                  Content for {section}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLanding;