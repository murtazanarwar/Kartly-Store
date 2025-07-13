import { Review } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface CreateReviewInput {
  productId: string;
  customerId: string;
  rating: number;
  comment: string;
  imageUrls?: string[];
}

const createReview = async (body: CreateReviewInput): Promise<Review> => {
  const { productId, ...payload } = body;
  const res = await fetch(
    `${URL}/${productId}/review`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) throw new Error(`Failed to create review: ${res.status}`);
  return res.json();
};

export default createReview;
