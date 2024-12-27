"use client";
import { productData } from "@/lib/static-data/Products";
import HeadingTwo from "../common/HeadingTwo";
import ProductCard from "./ProductCard";
import { v4 as uuidv4 } from 'uuid';

export default function ProductsSection({heading,type}:{heading:string,type:string}){
  return (
    <div className="flex flex-col gap-8 px-6 py-8 sm:px-20 sm:py-8 m-10">
      <div className="flex flex-col gap-3">
        <HeadingTwo text={heading} />
      </div>
        <div className="flex flex-wrap justify-between gap-6">
          {productData[0].collections.map((item:any)=>(
            <ProductCard key={uuidv4()} variant={type} collection={item} />
          ))}
        </div>
    </div>
  );
}
