import { Review } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface UpdateReviewInput {
  productId: string;
  reviewId: string;
  rating?: number;
  comment?: string;
}

const updateReview = async (body: UpdateReviewInput): Promise<Review> => {
  const { productId, reviewId, ...payload } = body;
  const res = await fetch(
    `${URL}/${productId}/review/${reviewId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) throw new Error(`Failed to update review: ${res.status}`);
  return res.json();
};

export default updateReview;
