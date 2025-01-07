"use client";
import React from "react";
import HeroSection from "./HeroSection";
import { useParams } from "next/navigation";
import ProductCard from "../products/ProductCard";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const Collection = ({ filteredProducts }: any) => {
  console.log(filteredProducts);
  const { category, collection } = useParams();
  const collectionName = collection
    ?.toString()
    .toUpperCase()
    .replace(/-/g, " ");
  const heading = `${collectionName} ${category?.toString().toUpperCase().replace(/-/g, " ")}  `;

  return (
    <div>
      <HeroSection heading={heading} />
      <div className="flex flex-col gap-8 px-12 py-8 md:px-15 sm:py-8 xl:m-0 justify-center items-center">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between gap-10 w-fit">
          {filteredProducts[0].products.map((item: any) => (
            <Link
              href={`/${item.type}/collection/${item.collectionType}/${item.slug}`}
              key={uuidv4()}
            >
              <ProductCard variant="product" collection={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
