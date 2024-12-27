"use client";
import React from 'react'
import HeadingTwo from '../common/HeadingTwo';
import Image from 'next/image';

const HeroSection = ({heading}:{heading:string}) => {
  //get the last item from url its format will be cotton-collection and convert it into Cotton Collection text


  return (
    <div className="flex gap-8 px-6 py-8 sm:px-20 sm:py-8 m-10 justify-evenly items-center">
      <HeadingTwo text={heading} className="font-light" />
    {/* <Image src={"/banner.png"} alt="shawls" width={1000} height={1000} className="w-1/2 rounded-lg"/> */}
  </div>
  )
}

export default HeroSection