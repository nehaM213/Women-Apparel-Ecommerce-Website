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
    <div className="flex flex-col gap-8 px-12 py-8 md:px-20 sm:py-8 lg:m-10">
      <div className="flex flex-col gap-3">
        {productData ? (
          <HeadingTwo text="Saree Collection" />
        ) : (
          <Skeleton className="h-8 w-48" />
        )}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between gap-10">
        {productData ? (
          productData[0].collections.map((item:any) => (
            <Link href={`${item.type}/collection/${item.collectionType}`} key={uuidv4()}>
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