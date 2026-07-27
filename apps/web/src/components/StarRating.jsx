import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, reviewCount = 0, showCount = true }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 transition-colors ${
              star <= rating
                ? 'fill-[#B8860B] text-[#B8860B]'
                : 'fill-none text-muted'
            }`}
          />
        ))}
      </div>
      {showCount && reviewCount > 0 && (
        <span className="text-xs text-muted-foreground ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}