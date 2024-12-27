"use client";
import React from 'react'
import HeroSection from './HeroSection';
import ProductsSection from '../products/ProductsSection';
import { useParams } from 'next/navigation';
import ProductCard from '../products/ProductCard';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

const Collection = ({filteredProducts}:any) => {
  console.log(filteredProducts);
  const { category, collection } = useParams();
  // console.log(category, collection);
  // in the category we will get the category name and convert it into the heading
  const collectionName = collection?.toString().toUpperCase().replace(/-/g, ' ');
  const heading = `${collectionName} ${category?.toString().toUpperCase().replace(/-/g, ' ')}  `;

  return (
    <div>
      <HeroSection heading={heading}/>
      <div className="flex flex-col gap-8 px-6 py-8 sm:px-20 sm:py-8 m-10">
      <div className="flex flex-wrap justify-start gap-6">
          {filteredProducts[0].products.map((item:any)=>(
            <Link href={`/${item.type}/collection/${item.collectionType}/${item.slug}`} key={uuidv4()}>
              <ProductCard variant="product" collection={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

{/* <div className="flex flex-col gap-8 px-6 py-8 sm:px-20 sm:py-8 m-10">
<div className="flex flex-col gap-3">
  <HeadingTwo text={heading} />
</div>
  <div className="flex flex-wrap justify-between gap-6">
    {productData[0].collections.map((item:any)=>(
      <ProductCard key={uuidv4()} variant={type} collection={item} />
    ))}
  </div>
</div> */}

export default Collection;