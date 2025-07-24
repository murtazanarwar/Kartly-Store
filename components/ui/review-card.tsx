"use client";

import { useState } from "react";
import Image from "next/image";
import { Review } from "@/types";
import updateReview from "@/actions/review/update-review";
import deleteReview from "@/actions/review/delete-review";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/shadcn_button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";

interface ReviewCardProps {
  data: Review;
  isAuthor: boolean;
  productId: string;
  onUpdate?: (updated: Review) => void;
  onDelete?: (id: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  data,
  productId,
  isAuthor,
  onUpdate,
  onDelete,
}) => {
  const { id, rating, comment, customer, images, createdAt } = data;

  const [isEditing, setIsEditing] = useState(false);
  const [newRating, setNewRating] = useState(rating);
  const [newComment, setNewComment] = useState(comment);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updated = await updateReview({ productId, reviewId: id, rating: newRating, comment: newComment });
      onUpdate?.(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteReview({ productId, reviewId: id });
      onDelete?.(id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full p-1 bg-white rounded-lg shadow-sm hover:shadow transition-shadow mb-4">
      <CardHeader className="flex justify-between items-start pb-2">
        <div className="flex items-center gap-3 w-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{(customer?.username || "?")[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-[14px] font-medium flex-1">
                {customer?.username || "Anonymous"}
              </CardTitle>
              
              {isAuthor && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="px-1">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setIsEditing(true)}>
                      <Edit2 size={14} className="mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleDelete}>
                      <Trash2 size={14} className="mr-2 text-red-500" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <CardDescription className="text-[14px] -mt-2 text-green-600">
              Verified Buyer
            </CardDescription>
            <CardDescription className="text-[10px] text-muted-foreground">
              {new Date(createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-1">
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 text-sm">
            {"★".repeat(rating)}{"☆".repeat(5 - rating)}
          </span>
        </div>
        <p className="text-sm leading-normal mb-3">{comment}</p>
        {images && images.length > 0 && (
          <div className="flex gap-1">
            {images.map((img) => (
              <div key={img.id} className="w-20 h-20 rounded-md overflow-hidden relative">
                <Image
                  src={img.url}
                  alt="Review Image"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>Update your rating and comment.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Rating</label>
              <Select
                onValueChange={(value) => setNewRating(Number(value))}
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
            <div>
              <label className="block text-sm font-medium">Comment</label>
              <Textarea rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            </div>
          </div>
          <DialogFooter className="space-x-2">
            <Button variant="destructive" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleUpdate} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CardFooter className="pt-2" />
    </Card>
  );
};

export default ReviewCard;