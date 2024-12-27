import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";

interface ReviewCardProps {
  name: string;
  comment: string;
  shortComment: string;
  rating: number;
  parent?: string;
  imgSrc: string;
  imgAlt?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  comment,
  rating,
  shortComment,
  imgSrc,
}) => {
  return (
    <Card className="inline-flex flex-col items-start justify-start flex-grow-0 flex-shrink-0 w-full gap-4 p-6 bg-white border md:w-96 md:pl-4 xl:pl-8 rounded-3xl border-slate-200">
      <div className="inline-flex items-center self-stretch justify-between">
        <div className="flex items-center justify-center gap-3">
          {/* <div className="flex items-center justify-center gap-2 rounded-full">
            <Image
              className="w-auto h-auto rounded-full"
              src={imgSrc}
              alt={"Image of reviewer"}
              width="50"
              height="50"
            />
          </div> */}
          <div className="flex-col justify-center items-center gap-0.5 inline-flex">
            <div className="text-lg leading-7 text-black text-center font-light">{name}</div>
            {/* <div className="text-base font-medium leading-normal truncate">
              nnn
            </div> */}
          </div>
        </div>
        <div className="flex items-center justify-start gap-2">
          {/* <div className="text-base font-bold leading-normal text-black">
            {rating}
          </div> */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-amber-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg> */}
        </div>
      </div>
      <div className="self-stretch h-0 border border-slate-200"></div>
      <div className="flex flex-col items-start self-stretch justify-start gap-2">
        {/* <div className="self-stretch text-xl font-light text-black">
          {shortComment}
        </div> */}
        <div className="self-stretch text-lg font-light italic">{comment}</div>
      </div>
    </Card>
  );
};

export default ReviewCard;
