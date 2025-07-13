"use client";

import { useEffect, useState } from "react";
import { Review } from "@/types";
import NoResult from "@/components/ui/no-result";
import ReviewCard from "@/components/ui/review-card";
import getReviews from "@/actions/review/get-reviews";

interface ReviewListProps {
  productId: string;
  customerId: string | undefined;
}

const ReviewList: React.FC<ReviewListProps> = ({
  productId,
  customerId,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getReviews({ productId })
      .then((data) => setReviews(data))
      .catch((err) => setError(err.message || "Failed to load reviews"))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleUpdate = (updated: Review) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  const handleDelete = (deletedId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== deletedId));
  };

  if (loading) {
    return <p className="text-center py-8">Loading reviews…</p>;
  }

  if (error) {
    return (
      <p className="text-center py-8 text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <NoResult />
      ) : (
        <div className="space-y-2">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              data={review}
              productId={productId}
              isAuthor={Boolean(customerId && review.customerId === customerId)}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
