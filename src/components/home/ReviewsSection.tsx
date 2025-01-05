import React from 'react'
import HeadingTwo from '../common/HeadingTwo'
import ReviewCorousel from '../reviews/ReviewCarousel'
import { reviewCards } from '@/lib/staticData'
import { Skeleton } from "@/components/ui/skeleton"

const ReviewsSection = () => {
  return (
    <div className="flex flex-col gap-8 px-12 py-8 md:px-20 sm:py-8 lg:m-10">
      <div className="flex flex-col gap-3 items-center justify-center">
        {reviewCards ? (
          <HeadingTwo text="What our customers say about Lazuli!" className="font-light text-center" />
        ) : (
          <Skeleton className="h-8 w-96" />
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-6">
        {reviewCards ? (
          <ReviewCorousel reviewCards={reviewCards}/>
        ) : (
          <div className="w-full flex justify-between gap-4">
            <Skeleton className="w-[350px] h-[200px] rounded-lg" />
            <Skeleton className="w-[350px] h-[200px] rounded-lg" />
            <Skeleton className="w-[350px] h-[200px] rounded-lg" />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewsSection