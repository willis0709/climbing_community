"use client";

import type { Comment as CommentType, UserSummary } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, type FormEvent } from "react";
import { mockUsers } from "@/lib/mock-data"; // For mocking current user
import { Send } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  videoId: string;
  initialComments?: CommentType[];
}

export function CommentSection({ videoId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock current user
  const currentUser: UserSummary = mockUsers[0]; 

  const handleSubmitComment = async (event: FormEvent) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const commentToAdd: CommentType = {
      id: `comment-${Date.now()}`,
      user: currentUser,
      text: newComment,
      timestamp: new Date().toISOString(),
    };
    setComments([commentToAdd, ...comments]);
    setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmitComment} className="space-y-3">
          <Textarea
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting || !newComment.trim()} className="w-full sm:w-auto">
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {comments.length === 0 && <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>}
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg shadow-sm">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.substring(0,1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{comment.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </p>
                </div>
                <p className="text-sm mt-1 text-foreground/90">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
