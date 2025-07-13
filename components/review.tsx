"use client"

import { useState } from "react";
import AddReview from "./add-review";
import ReviewList from "./review-list";
import { getCurrentUserId } from "@/actions/get-currentuser";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

interface ReviewProps {
  productId: string;
}

const Review:React.FC<ReviewProps> = ({ productId }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const customerId = getCurrentUserId();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-4">
        <h3 className="font-bold text-3xl">Customer Reviews</h3>
        {customerId
        ?
            <AddReview
                productId={productId}
                customerId={customerId}
                onSuccess={() => setRefreshKey((k) => k + 1)}
            />
        :
          <div className="flex items-center justify-center">
            <Button onClick={() => router.push('/log-in')}>Login To Add Reviews</Button>
          </div>
        }
        <ReviewList
            key={refreshKey}
            productId={productId}
            customerId={customerId}
        />

    </div>
  );
}

export default Review;