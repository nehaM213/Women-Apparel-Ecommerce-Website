import React from 'react'
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

const ReviewStars = ({rating}: {rating: number}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key={fullStars} />);
  }

  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
    stars.push(<FaRegStar key={i} />);
  }

  return (
    <div className="flex items-center font-light">
      {stars}
      <span className="ml-2">({rating})</span>
    </div>
  )
}
export default ReviewStars