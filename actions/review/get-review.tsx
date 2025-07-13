import { Review } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getReview = async (
  productId: string,
  reviewId: string
): Promise<Review> => {
  const res = await fetch(
    `${URL}/${productId}/review/${reviewId}`
  );
  if (!res.ok) throw new Error(`Failed to fetch review: ${res.status}`);
  return res.json();
};

export default getReview;
