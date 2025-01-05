import React from 'react'
import ProductsSection from '../products/ProductsSection'
import ProductCard from '../products/ProductCard'
import { productData } from '@/lib/static-data/Products'
import HeadingTwo from '../common/HeadingTwo'
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"

const LatestProducts = () => {
  const latestProducts = productData
    .flatMap((item: any) => 
      item.collections.flatMap((collection: any) => 
        collection.products
      )
    )
    .sort((a: any, b: any) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
    .slice(0, 4); // Get the latest 4 products
  return (
    // <ProductsSection heading="Just Launched" type="product"/>
    <div className="flex flex-col gap-8 px-12 py-8 md:px-15 sm:py-8 xl:m-0 justify-center items-center">
    <div className="flex flex-col gap-3">
      {productData ? (
        <HeadingTwo text="Just Launched" />
      ) : (
        <Skeleton className="h-8 w-48" />
      )}
    </div>
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between gap-10 w-fit">
      {productData ? (
        latestProducts.map((product: any) => (
          <Link href={`/${product.type}/collection/${product.collectionType}/${product.slug}`} key={uuidv4()} className='w-fit'>
            <ProductCard variant="product" collection={product} />
          </Link>
        ))
      ) : (
        <>
          <Skeleton className="w-[300px] h-[400px] rounded-lg" />
          <Skeleton className="w-[300px] h-[400px] rounded-lg" />
          <Skeleton className="w-[300px] h-[400px] rounded-lg" />
          <Skeleton className="w-[300px] h-[400px] rounded-lg" />
        </>
      )}
    </div>
  </div>
  )
}

export default LatestProducts