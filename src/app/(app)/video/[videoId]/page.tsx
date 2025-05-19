
"use client"; // Required for useState, useEffect, toast

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getVideoById, mockUsers } from "@/lib/mock-data";
import type { User, Video as VideoType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AiAnalysisDisplay } from "@/components/ai-analysis-display";
import { CommentSection } from "@/components/comment-section";
import { Eye, MapPin, Tag, TrendingUp, UserCircle, CalendarDays, MessageSquare, ThumbsUp, Share2, Lock, Star, ShieldCheck, Coins, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function VideoPage() {
  const params = useParams();
  const videoId = params?.videoId as string;
  const router = useRouter();
  const { toast } = useToast();

  const [video, setVideo] = useState<VideoType | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (videoId) {
      const foundVideo = getVideoById(videoId);
      setVideo(foundVideo || null);
    }
    setCurrentUser(mockUsers[0]); 
  }, [videoId]);

  if (!video) {
    return <div className="text-center py-10">Video not found or still loading...</div>;
  }

  const isMember = currentUser?.isMember || false;
  const canViewVideo = !video.isExclusive || (video.isExclusive && isMember);

  const handleSponsorVideo = () => {
    toast({
      title: "Thank You for Sponsoring!",
      description: `You've supported ${video.uploader.name} for their video "${video.title}".`,
      action: <Coins className="text-yellow-500" />,
    });
  };

  if (!canViewVideo) {
    return (
      <div className="container mx-auto py-8 max-w-3xl text-center">
        <Card className="p-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center justify-center">
              <Lock className="mr-3 h-8 w-8 text-primary" /> Members Only Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">
              This video, "{video.title}", is exclusive to Vertical Visions members.
            </p>
            <Image src={video.thumbnailUrl} alt={video.title} width={600} height={338} className="rounded-md mx-auto shadow-md" data-ai-hint={video.dataAiHint || "climbing preview"} />
            <p className="mt-4">Join our community to unlock this video and many other benefits, including exclusive content, advanced AI analysis, and personalized training tips.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={`/membership?redirect=/video/${video.id}`} passHref legacyBehavior>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Star className="mr-2 h-5 w-5" /> View Membership Plans
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            {video.videoUrl ? (
               <div className="aspect-video bg-black flex items-center justify-center text-white relative">
                <Image src={video.thumbnailUrl} alt={video.title} layout="fill" objectFit="cover" data-ai-hint={video.dataAiHint || "climbing action"}/>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 hover:bg-black/10 transition-colors cursor-pointer">
                    <PlayCircle className="h-20 w-20 text-white/80 group-hover:text-white" />
                    <p className="text-lg mt-2 text-white/90">Video Player (1080p)</p>
                </div>
                 {video.isExclusive && (
                    <Badge variant="default" className="absolute top-3 left-3 bg-accent text-accent-foreground py-1 px-2 text-xs z-20">
                      <Star className="h-3 w-3 mr-1" /> Members Exclusive
                    </Badge>
                  )}
              </div>
            ) : (
              <div className="aspect-video bg-muted flex items-center justify-center">
                <p>Video preview not available.</p>
              </div>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold">{video.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-2 space-x-4">
                <div className="flex items-center">
                  <Eye className="mr-1.5 h-4 w-4" /> {video.views.toLocaleString()} views
                </div>
                <div className="flex items-center">
                  <CalendarDays className="mr-1.5 h-4 w-4" /> Uploaded {format(new Date(video.uploadDate), "PPP")}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  <MapPin className="mr-1.5 h-4 w-4" /> {video.location}
                </Badge>
                <Badge variant="outline" className="text-sm py-1 px-3">
                  <TrendingUp className="mr-1.5 h-4 w-4" /> {video.difficulty}
                </Badge>
                <Badge variant="outline" className="text-sm py-1 px-3">
                  <Tag className="mr-1.5 h-4 w-4" /> {video.routeType}
                </Badge>
              </div>
              {video.description && <p className="text-foreground/80 mt-1 whitespace-pre-line">{video.description}</p>}
              
              <Separator className="my-6" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-2">
                    <Button variant="outline"><ThumbsUp className="mr-2 h-4 w-4" /> Like</Button>
                    <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                 </div>
                 {isMember && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Coins className="mr-2 h-4 w-4" /> Sponsor this Video
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Sponsor "{video.title}"?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Support {video.uploader.name} by sponsoring this video. This is a mock action for the prototype. 
                            Choose a mock sponsorship amount:
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex justify-around my-4">
                            <Button variant="outline" onClick={() => {handleSponsorVideo(); (document.querySelector('[data-radix-AlertDialogCancel]') as HTMLElement)?.click();}}>$5</Button>
                            <Button variant="outline" onClick={() => {handleSponsorVideo(); (document.querySelector('[data-radix-AlertDialogCancel]') as HTMLElement)?.click();}}>$10</Button>
                            <Button variant="outline" onClick={() => {handleSponsorVideo(); (document.querySelector('[data-radix-AlertDialogCancel]') as HTMLElement)?.click();}}>$25</Button>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          {/* <AlertDialogAction onClick={handleSponsorVideo}>Confirm Sponsorship</AlertDialogAction> */}
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                 )}
              </div>
            </CardContent>
          </Card>

          {video.aiAnalysis && <AiAnalysisDisplay analysis={video.aiAnalysis} />}
          
          {video.sponsors && video.sponsors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Coins className="mr-2 h-5 w-5 text-yellow-500" /> Video Sponsors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {video.sponsors.map(sponsorEntry => (
                  <div key={sponsorEntry.user.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={sponsorEntry.user.avatarUrl} alt={sponsorEntry.user.name}/>
                      <AvatarFallback>{sponsorEntry.user.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{sponsorEntry.user.name}</span>
                    <Badge variant="secondary" className="ml-auto">${sponsorEntry.amount}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <CommentSection videoId={video.id} initialComments={video.comments} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uploader</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Link href={`/profile?userId=${video.uploader.id}`} passHref legacyBehavior>
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={video.uploader.avatarUrl} alt={video.uploader.name} />
                  <AvatarFallback>{video.uploader.name.substring(0,2)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link href={`/profile?userId=${video.uploader.id}`} passHref legacyBehavior>
                  <h3 className="text-lg font-semibold hover:text-primary">{video.uploader.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">{mockUsers.find(u => u.id === video.uploader.id)?.climbingExperience || 'Climber'}</p>
                 {mockUsers.find(u => u.id === video.uploader.id)?.isMember && (
                   <Badge variant="outline" className="mt-1 text-xs border-accent text-accent">
                     <Star className="mr-1 h-3 w-3" /> Member
                   </Badge>
                 )}
                <Button variant="outline" size="sm" className="mt-2">Follow</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Related Videos</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">Related videos coming soon.</p></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
