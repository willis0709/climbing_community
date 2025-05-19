
"use client"; // Added this line

import type { Video, User } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MapPin, Tag, TrendingUp, Lock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { mockUsers } from "@/lib/mock-data"; // To check current user's membership status

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  // Mock current user for membership check
  const currentUser = mockUsers[0] as User; 

  const isAccessible = !video.isExclusive || (video.isExclusive && currentUser.isMember);
  const cardHref = isAccessible ? `/video/${video.id}` : `/membership?redirect=/video/${video.id}`;

  return (
    <Link href={cardHref} passHref legacyBehavior>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full flex flex-col group">
        <CardHeader className="p-0 relative">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={600}
            height={338} // 16:9 aspect ratio
            className="object-cover w-full aspect-video"
            data-ai-hint={video.dataAiHint || "climbing video"}
          />
          {video.isExclusive && (
            <Badge variant="default" className="absolute top-2 right-2 bg-accent text-accent-foreground py-1 px-2 text-xs">
              <Star className="h-3 w-3 mr-1" /> Members Only
            </Badge>
          )}
           {!isAccessible && (
             <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                <Lock className="h-10 w-10 mb-2" />
                <p className="font-semibold">Exclusive Content</p>
                <p className="text-xs">Join membership to watch</p>
             </div>
           )}
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold mb-2 leading-tight group-hover:text-primary transition-colors">
            {video.title}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={video.uploader.avatarUrl} alt={video.uploader.name} />
              <AvatarFallback>{video.uploader.name.substring(0,1)}</AvatarFallback>
            </Avatar>
            <span>{video.uploader.name}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true })}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t mt-auto">
          <div className="flex flex-wrap gap-2 text-xs w-full items-center">
            <Badge variant="secondary" className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> {video.location.split(',')[0]}
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> {video.difficulty}
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Tag className="h-3 w-3 mr-1" /> {video.routeType}
            </Badge>
            <div className="flex items-center text-muted-foreground ml-auto">
              <Eye className="h-3 w-3 mr-1" /> {video.views.toLocaleString()}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
