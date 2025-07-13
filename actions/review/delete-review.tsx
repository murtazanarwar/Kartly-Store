const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface DeleteReviewInput {
  productId: string;
  reviewId: string;
}

const deleteReview = async ({
  productId,
  reviewId,
}: DeleteReviewInput): Promise<void> => {
  const res = await fetch(
    `${URL}/${productId}/review/${reviewId}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error(`Failed to delete review: ${res.status}`);
};

export default deleteReview;
