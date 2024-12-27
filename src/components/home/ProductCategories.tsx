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
    <div className="flex flex-col gap-8 px-6 py-8 sm:px-20 sm:py-8 m-10">
      <div className="flex flex-col gap-3">
        {productData ? (
          <HeadingTwo text="Saree Collection" />
        ) : (
          <Skeleton className="h-8 w-48" />
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-6">
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