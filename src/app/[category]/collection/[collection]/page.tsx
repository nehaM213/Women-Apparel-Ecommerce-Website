import Collection from '@/components/Collection/Collection'
import { productData } from '@/lib/static-data/Products';
import React from 'react'

// Add type for the page props
interface PageProps {
  params: {
    category: string;
    collection: string;
  }
}

// Convert to server component by removing 'use client' (if it exists)
// Add props parameter to get URL params
const Page = ({ params: { category, collection } }: PageProps) => {
  const categoryName = category.toLowerCase().replace(/-/g, ' ');
  const collectionName = collection.toLowerCase().replace(/-/g, ' ');
  
  const filteredProducts = productData.filter(product => 
    product.category.toLowerCase() === categoryName );  
  const filteredCollection = filteredProducts[0].collections.filter(collection => 
    collection.collectionType.toLowerCase() === collectionName);
  // console.log(filteredCollection);

  return (
    <div>
      <Collection filteredProducts={filteredCollection} />
    </div>
  )
}

export default Page