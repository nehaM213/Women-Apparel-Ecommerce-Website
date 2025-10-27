import React, { useState, memo, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import ReviewStars from "../reviews/ReviewStars";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";
// import { wishlistStore } from "@/store/wishListStore";
interface ProductCardProps {
  variant: string;
  collection: {
    id: string | number;
    title: string;
    heading?: string;
    price: number;
    rating?: number;
    images: string[];
    type: string;
    collectionType: string;
    slug: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ variant, collection }) => {
  const dispatch = useDispatch();
  // const { wishlist } = wishlistStore();
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(
        addItem({
          id: collection.id.toString(),
          title: collection.title,
          price: collection.price,
          quantity: 1,
          images: collection.images,
          type: collection.type,
          collectionType: collection.collectionType,
          slug: collection.slug,
        })
      );
      toast({
        title: `${collection.title} added to cart`,
        duration: 2000,
      });
    },
    [dispatch, collection, toast]
  );

  return (
    <div className="w-fit">
      <Card
        className={`w-[270px] ${
          variant === "category" ? "h-[410px]" : "h-[460px]"
        } hover:border-black cursor-pointer relative group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <CardContent className="p-0 rounded-tr-lg rounded-tl-lg relative">
          <Image
            src={collection.images[0] || "/placeholder.png"}
            alt={`${collection.title} — ${collection.collectionType} view`}
            height={300}
            width={720}
            loading="lazy"
            className="object-cover w-full h-[350px] rounded-tr-lg rounded-tl-lg"
          />

          {/* Quick Actions Overlay */}
          {variant !== "category" && (
            <div
              className={`absolute inset-0 bg-black/40 hidden lg:flex items-center justify-center gap-3 transition-opacity duration-300 rounded-tr-lg rounded-tl-lg ${isHovered ? "opacity-100" : "opacity-0"}`}
            >
              <Button
                variant="secondary"
                size="sm"
                className="bg-white hover:bg-gray-100 text-black"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          )}

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
                <TooltipTrigger asChild>
                  <p className="mt-3 text-xl truncate max-w-[250px] text-center">
                    {collection.heading}
                  </p>
                </TooltipTrigger>
                <TooltipContent>{collection.heading}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        ) : (
          <CardFooter className="flex flex-col items-start w-full px-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="mt-2 text-lg font-light truncate max-w-[200px]">
                    {collection.title}
                  </p>
                </TooltipTrigger>
                <TooltipContent>{collection.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center justify-between w-full mt-2">
              <div>
                <p className="text-lg font-light">₹{collection.price}</p>
                {collection.rating && (
                  <ReviewStars rating={collection.rating} />
                )}
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default memo(ProductCard);
