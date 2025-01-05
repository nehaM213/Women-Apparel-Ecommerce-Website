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
    <div className="flex flex-col gap-8 px-12 py-8 md:px-15 sm:py-8 xl:m-0 justify-center items-center">
      <div className="flex flex-col gap-3">
        {productData ? (
          <HeadingTwo text="Best Sellers" />
        ) : (
          <Skeleton className="h-8 w-48" />
        )}
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between gap-10 w-fit">
        {productData ? (
          productData.map((item:any)=>(
            item.collections.map((collection:any)=>(  
              collection.products.map((product:any)=>(
                (product.rating > 4.5) && (
                  <Link href={`/${product.type}/collection/${product.collectionType}/${product.slug}`} key={uuidv4()} className='w-fit'>
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