import React from 'react'
import ProductsSection from '../products/ProductsSection'
import { productData } from '@/lib/static-data/Products'
import HeadingTwo from '../common/HeadingTwo'
import ProductCard from '../products/ProductCard'
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"

const BestSellers = () => {
  return (
    <div className="flex flex-col gap-8 px-12 py-8 md:px-20 sm:py-8 lg:m-10">
      <div className="flex flex-col gap-3">
        {productData ? (
          <HeadingTwo text="Best Sellers" />
        ) : (
          <Skeleton className="h-8 w-48" />
        )}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between gap-6">
        {productData ? (
          productData.map((item:any)=>(
            item.collections.map((collection:any)=>(  
              collection.products.map((product:any)=>(
                (product.rating > 4.5) && (
                  <Link href={`/${product.type}/collection/${product.collectionType}/${product.slug}`} key={uuidv4()}>
                    <ProductCard variant="product" collection={product} />
                  </Link>
                )
              ))
            ))
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

export default BestSellers