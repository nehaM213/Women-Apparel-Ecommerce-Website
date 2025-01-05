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
}) => {
  return (
    <Card className="inline-flex flex-col items-start justify-start flex-grow-0 flex-shrink-0 w-full gap-4 p-6 bg-white md:w-96 md:pl-4 xl:pl-8 rounded-3xl border-none">
      <div className="border-b w-full pb-2">
        <div className="text-lg leading-7 text-black text-center font-light">{name}</div>
      </div>
        <div className="text-lg font-light italic text-center">{comment}</div>
    </Card>
  );
};

export default ReviewCard;
