"use client";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { NextButton, PrevButton, usePrevNextButtons } from "../common/carousel/EmblaCarouselArrowButtons";
import ReviewCard from "./ReviewCard";
import { ReviewData } from "@/lib/types";
import Autoplay from 'embla-carousel-autoplay'
import { Skeleton } from "@/components/ui/skeleton"

interface CorouselSingleReviewProps {
  reviewCards: {
    name: string;
    comment: string;
    rating: number;
    shortComment: string;
    imgSrc: string;
  }[];
}

const ReviewCorousel = (
 {reviewCards}:{reviewCards:ReviewData[]}) => {
  // const options: EmblaOptionsType = {};

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="max-w-full relative mt-10 md:mt-0">
      <div
        className="flex gap-1/4 justify-end absolute lg:-top-24 -top-16 right-0"
      >
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          aria-label="Left icon"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          aria-label="Right icon"
        />
      </div>
      <div className="relative space-y-4 overflow-hidden" ref={emblaRef}>
        <div className="relative flex gap-4 backface-visibility-hidden">
          <>
            {Array.isArray(reviewCards) ? (
              reviewCards.map((card, index) => (
                <ReviewCard
                  key={uuidv4()}
                  name={card.name}
                  comment={card.comment}
                  shortComment={card.shortComment}
                  rating={4.5}
                  imgSrc={card.imgSrc}
                />
              ))
            ) : (
              <>
                <Skeleton className="inline-flex flex-grow-0 flex-shrink-0 w-full h-64 gap-4 p-6 border md:w-96 md:pl-4 xl:pl-8 rounded-3xl" />
                <Skeleton className="inline-flex flex-grow-0 flex-shrink-0 w-full h-64 gap-4 p-6 border md:w-96 md:pl-4 xl:pl-8 rounded-3xl" />
                <Skeleton className="inline-flex flex-grow-0 flex-shrink-0 w-full h-64 gap-4 p-6 border md:w-96 md:pl-4 xl:pl-8 rounded-3xl" />
              </>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default ReviewCorousel;
