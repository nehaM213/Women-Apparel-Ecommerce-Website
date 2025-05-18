"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { AddProducts } from './AddProducts';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const ProductList = () => {
  const [isAddProductVisible, setAddProductVisible] = useState(false);
    const handleAddProductClick = () => {
    setAddProductVisible(!isAddProductVisible);
  };

  // Dummy product list
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];

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
            {/* Displaying the product list in a table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
        </div>
    </div>
  )
}

export default ProductList