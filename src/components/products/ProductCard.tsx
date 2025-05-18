import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import ReviewStars from "../reviews/ReviewStars";
import { Button } from "../ui/button";
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import { useParams } from "next/dist/client/components/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { wishlistStore } from "@/store/wishListStore";
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '@/store/cartSlice';
import { useToast } from "@/hooks/use-toast";

const ProductCard = ({variant, collection}: {variant: string; collection: any}) => {
  const dispatch = useDispatch();
  const { wishlist, addToWishlist, removeFromWishlist } = wishlistStore();
  const isLiked = wishlist.includes(collection.id);
  const [isHovered, setIsHovered] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const category = useParams().category;
  const { toast } = useToast()


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCart) {
      dispatch(removeItem(collection.id));
      toast({
        title: "Product removed from cart",
        
      })
    setIsInCart(false);
    } else {
      dispatch(addItem({
        id: collection.id,
        title: collection.title,
        price: collection.price,
        quantity: 1,
        images: collection.images,
        type:collection.type,
        collectionType:collection.collectionType,
        slug:collection.slug
      }));
      toast({
        title: "Product added to cart",
      })
      setIsInCart(true);
    }
  };

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
          {variant !== "category" && (<div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 rounded-tr-lg rounded-tl-lg ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-white hover:bg-gray-100 text-black"
              onClick={handleAddToCart}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </div>)}

          {/* Wishlist Button */}
          {/* <button 
            onClick={(e) => {
              e.preventDefault();
              if (isLiked) {
                removeFromWishlist(collection.id);
              } else {
                addToWishlist(collection.id);
              }
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            {isLiked ? (
              <PiHeartFill className="text-red-500 text-xl" />
            ) : (
              <PiHeartLight className="text-xl" />
            )}
          </button> */}
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
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProductCard;
