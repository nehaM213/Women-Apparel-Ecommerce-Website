import React from 'react'
import ProductsSection from '../products/ProductsSection'
import HeadingTwo from '../common/HeadingTwo'
import { productData } from '@/lib/static-data/Products'
import ProductCard from '../products/ProductCard'
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"

const ProductCategories = () => {
  return (
    <div className="flex flex-col gap-8 px-12 py-8 md:px-15 sm:py-8 xl:m-0 justify-center items-center">
      <div className="flex flex-col gap-3">
        {productData ? (
          <HeadingTwo text="Saree Collection" />
        ) : (
          <Skeleton className="h-8 w-48" />
        )}
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between gap-10 w-fit">
        {productData ? (
          productData[0].collections.map((item:any) => (
            <Link href={`${item.type}/collection/${item.collectionType}`} key={uuidv4()} className='w-fit'>
              <ProductCard variant="category" collection={item} />
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

export default ProductCategories