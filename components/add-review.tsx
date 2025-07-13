"use client";

import { useState } from "react";
import { Review } from "@/types";
import createReview from "@/actions/review/create-review";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddReviewProps {
  productId: string;
  customerId: string;
  onSuccess?: (newReview: Review) => void;
}

const AddReview: React.FC<AddReviewProps> = ({
  productId,
  customerId,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [imagesInput, setImagesInput] = useState<string>(""); // raw string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanedImageUrls = imagesInput
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url);

    try {
      const newReview = await createReview({
        productId,
        customerId,
        rating,
        comment,
        imageUrls: cleanedImageUrls,
      });

      // Reset state
      setRating(5);
      setComment("");
      setImagesInput("");
      onSuccess?.(newReview);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-end -mt-14">
        <DialogTrigger asChild>
          <Button>Add Review</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-lg sm:w-full">
        <DialogHeader>
          <DialogTitle>Add Your Review</DialogTitle>
          <DialogDescription>
            Share your feedback on this product.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Rating */}
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Select
              onValueChange={(value) => setRating(Number(value))}
              defaultValue={String(rating)}
            >
              <SelectTrigger id="rating" className="w-full">
                <SelectValue placeholder="Select a rating..." />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} Star{n > 1 && "s"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your thoughts..."
              required
              className="h-24"
            />
          </div>

          {/* Image URLs */}
          <div>
            <Label htmlFor="images">Image URLs (comma-separated)</Label>
            <Input
              id="images"
              value={imagesInput}
              onChange={(e) => setImagesInput(e.target.value)}
              placeholder="https://image1.com, https://image2.com"
            />
          </div>

          {/* Submit */}
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
