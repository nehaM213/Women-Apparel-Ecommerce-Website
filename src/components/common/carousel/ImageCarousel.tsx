import { Skeleton } from "@/components/ui/skeleton";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'

type ImageType = {
  guid: string;
};

type ImageCarouselProps = {
  images: ImageType[];
};
// const images = [
//   {
//     guid: "/productImages/car1.jpg",
//   },
//   {
//     guid: "/productImages/car2.jpg",
//   },
//   {
//     guid: "/productImages/car3.avif",
//   },
// ];
const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section>
      <div className="overflow-hidden mt-0" ref={emblaRef}>
        <div className="flex">
          {images ? (
            images?.map((image,index) => (
                <Image
                  className="flex-shrink-0 flex-grow-0 basis-full min-w-0 h-[500px] object-cover"
                  src={image.guid}
                  alt={`Picture of card`}
                  width={1000}
                  height={1000}
                  quality={100}
                  key={index}
                  priority
                />
            ))
          ) : (
            <div className="relative inline-flex w-full gap-1 overflow-hidden">
              <Skeleton className="w-1/4 h-64" />
              <Skeleton className="w-1/4 h-64" />
              <Skeleton className="w-1/4 h-64" />
              <Skeleton className="w-1/4 h-64" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
{/* <ImageCarousel images={images} /> */}

export default ImageCarousel;
