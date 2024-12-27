"use client"
import dynamic from "next/dynamic";
import React from 'react';
import ImageCarousel from '../common/carousel/ImageCarousel';
const ProductCategories = dynamic(()=>import('./ProductCategories'),{
  loading: () => <p>Loading...</p>,
});
const BestSellers = dynamic(()=>import('./BestSellers'),{
  loading: () => <p>Loading...</p>,
});
const LatestProducts = dynamic(()=>import('./LatestProducts'),{
  loading: () => <p>Loading...</p>,
});
const Reviews = dynamic(() => import('./ReviewsSection'),{
  loading: () => <p>Loading...</p>,
});

const images = [
  {
    guid: "/sareeBanner.webp",
  },
  {
    guid: "/sareeBanner2.webp",
  },
  {
    guid: "/productImages/car3.avif",
  },
];
const Home = () => {
  return (
    <div>
        <ImageCarousel images={images}/>
        <ProductCategories />
        <BestSellers />
        <LatestProducts />
        <Reviews/>
    </div>
  )
}

export default Home