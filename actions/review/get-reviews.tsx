import { Review } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface GetReviewsQuery {
  productId: string;
}

const getReviews = async ({
  productId,
}: GetReviewsQuery): Promise<Review[]> => {
  const url = qs.stringifyUrl({
    url: `${URL}/${productId}/review`,
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.status}`);
  return res.json();
};

export default getReviews;
