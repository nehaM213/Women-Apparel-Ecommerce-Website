import React from 'react'
import HeadingTwo from '../common/HeadingTwo'
import ReviewCorousel from '../reviews/ReviewCarousel'
import { reviewCards } from '@/lib/staticData'
import { Skeleton } from "@/components/ui/skeleton"

const ReviewsSection = () => {
  return (
    <div className="flex flex-col gap-12 px-6 py-8 sm:px-20 sm:py-8 m-10">
      <div className="flex flex-col gap-3 items-center justify-center">
        {reviewCards ? (
          <HeadingTwo text="What our customers say about Lazuli!" className="font-light" />
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