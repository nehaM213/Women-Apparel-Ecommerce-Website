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
          <div className="flex-col justify-center items-center gap-0.5 inline-flex">
            <div className="text-lg leading-7 text-black text-center font-light">{name}</div>
          </div>
        </div>
        <div className="flex items-center justify-start gap-2">
        </div>
      </div>
      <div className="self-stretch h-0 border border-slate-200"></div>
      <div className="flex flex-col items-start self-stretch justify-start gap-2">
        <div className="self-stretch text-lg font-light italic">{comment}</div>
      </div>
    </Card>
  );
};

export default ReviewCard;
