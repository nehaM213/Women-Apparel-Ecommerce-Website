"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { AddProducts } from './AddProducts';

const ProductList = () => {
  const [isAddProductVisible, setAddProductVisible] = useState(false);
    const handleAddProductClick = () => {
    setAddProductVisible(!isAddProductVisible);
  };
  return (
    <div>
        <div className="p-4 border-b">
            <h1 className="text-2xl font-semibold">Product List</h1>
        </div>
        <div className='flex flex-col align-bottom p-4'>
            <Button onClick={handleAddProductClick} className='self-end'>
              {isAddProductVisible ? 'Close Add Product Form' : 'Add Product'}
            </Button>
          <div>
            {isAddProductVisible && (
              <AddProducts />
            )}
          </div>
        </div>
    </div>
  )
}

export default ProductList