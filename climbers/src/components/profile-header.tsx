import type { User } from "@/lib/types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit3, MapPin, Star, Users, TrendingUp, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 relative h-48 bg-gradient-to-r from-primary/80 to-accent/80">
        {/* Placeholder for a cover image */}
         <Image src="https://placehold.co/1200x300.png" alt="Profile cover" layout="fill" objectFit="cover" data-ai-hint="mountain landscape"/>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 space-x-0 sm:space-x-5">
          <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background rounded-full shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person climbing"/>
            <AvatarFallback className="text-4xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 mt-4 sm:mt-0 sm:pb-5 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground">{user.climbingExperience} Climber</p>
            <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <Badge variant="secondary"><MapPin className="w-3 h-3 mr-1"/> From Earth</Badge>
              <Badge variant="secondary"><CalendarDays className="w-3 h-3 mr-1"/> Joined 2023</Badge>
            </div>
          </div>
          <Button variant="outline" className="mt-4 sm:mt-0 sm:self-end">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t pt-4">
          <div>
            <p className="text-2xl font-bold">{user.uploadedVideos?.length || 0}</p>
            <p className="text-sm text-muted-foreground">Videos</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.followers?.length || 120}</p> {/* Mocked */}
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.following?.length || 75}</p> {/* Mocked */}
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.achievements.length}</p>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
