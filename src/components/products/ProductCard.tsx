import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import ReviewStars from "../reviews/ReviewStars";
import { Button } from "../ui/button";
import { PiHeartFill, PiHeartLight, PiShoppingCartSimple } from "react-icons/pi";
import Link from "next/link";
import { useParams } from "next/dist/client/components/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProductCard = ({variant, collection}: {variant: string; collection: any}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const category = useParams().category;

  return (
    <div className="w-fit">
      <Card 
        className={`w-[270px] h-[460px] hover:border-black cursor-pointer relative group ${variant === "category" ? "h-[410px]" : "h-[460px]"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <CardContent className="p-0 rounded-tr-lg rounded-tl-lg relative">
          <Image 
            src={collection.images[0]} 
            alt="Product Image" 
            height={300} 
            width={720} 
            className="rounded-tr-lg rounded-tl-lg object-cover w-full h-[350px]" 
          />
          
          {/* Quick Actions Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-white hover:bg-gray-100 text-black"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
              }}
            >
              <PiShoppingCartSimple className="mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            {isLiked ? (
              <PiHeartFill className="text-red-500 text-xl" />
            ) : (
              <PiHeartLight className="text-xl" />
            )}
          </button>
        </CardContent>

        {/* Product Info Section */}
        {variant === "category" ? (
          <CardFooter className="m-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="m-auto mt-3 text-xl truncate max-w-[250px]">
                    {collection.heading}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{collection.heading}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        ) : (
          <CardFooter className="flex flex-col items-start w-full px-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="mt-2 text-lg font-light truncate max-w-[200px]">
                    {collection.title}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{collection.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex items-center justify-between w-full mt-2">
              <div>
                <p className="text-lg font-light">₹{collection.price}</p>
                <ReviewStars rating={collection.rating} />
              </div>
              {/* <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-black hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Quick view logic here
                }}
              >
                Quick View
              </Button> */}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProductCard;
