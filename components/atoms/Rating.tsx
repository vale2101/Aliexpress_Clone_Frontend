import React from "react";

interface RatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewCount, showCount = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <span key={i} className="text-yellow-400 text-sm">
                ★
              </span>
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <span key={i} className="text-yellow-400 text-sm">
                ☆
              </span>
            );
          } else {
            return (
              <span key={i} className="text-gray-300 text-sm">
                ★
              </span>
            );
          }
        })}
      </div>
      <span className="text-sm text-gray-600 ml-1">{rating}</span>
      {showCount && reviewCount && (
        <span className="text-sm text-gray-500">({reviewCount})</span>
      )}
    </div>
  );
};

export default Rating;
