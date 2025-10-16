import Collection from '@/components/Collection/Collection'
import { productData } from '@/lib/static-data/Products';
import React from 'react'

interface PageProps {
  params: Promise<{
    category: string;
    collection: string;
  }>
}

const Page = async ({ params }: PageProps) => {
  const { category, collection } = await params

  const categoryName = category.toLowerCase().replace(/-/g, ' ')
  const collectionName = collection.toLowerCase().replace(/-/g, ' ')
  
  const filteredProducts = productData.filter(product => 
    product.category.toLowerCase() === categoryName
  )
  const filteredCollection = filteredProducts[0].collections.filter(
    col => col.collectionType.toLowerCase() === collectionName
  )

  return (
    <div>
      <Collection filteredProducts={filteredCollection} />
    </div>
  )
}

export default Page
