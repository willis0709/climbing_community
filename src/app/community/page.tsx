
import { mockForumTopics, mockChallenges, mockUsers, getSponsorsLeaderboard } from "@/lib/mock-data";
import type { User } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Search, CalendarClock, Users2, PlusCircle, ArrowRight, Flame, Award, Coins, Heart, Repeat, Share2, Star } from "lucide-react"; // Added Star here
import Link from "next/link";
import Image from "next/image";
import { format, formatDistanceToNow } from 'date-fns';
import { Badge } from "@/components/ui/badge";

// Mock current user for potential member checks if needed later
const currentUser = mockUsers[0] as User;
const sponsorsLeaderboard = getSponsorsLeaderboard();

export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <Card className="text-center py-10 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Community Hub</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Connect with fellow climbers, join discussions, participate in challenges, and see top supporters.
          </CardDescription>
        </CardHeader>
      </Card>
      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="challenges"><Flame className="mr-2 h-4 w-4" /> Challenges</TabsTrigger>
          <TabsTrigger value="forum"><MessageSquare className="mr-2 h-4 w-4" /> 討論串</TabsTrigger>
          <TabsTrigger value="sponsors"><Award className="mr-2 h-4 w-4" /> Sponsor Hub</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-2xl">Climbing Challenges</CardTitle>
                    <CardDescription>Test your limits and climb with the community.</CardDescription>
                </div>
                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Create Challenge</Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockChallenges.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden flex flex-col">
                  {challenge.imageUrl && (
                    <div className="relative h-40 w-full">
                        <Image src={challenge.imageUrl} alt={challenge.title} layout="fill" objectFit="cover" data-ai-hint={challenge.dataAiHint || "climbing challenge"}/>
                        <Badge className="absolute top-2 right-2 capitalize" variant={challenge.status === 'active' ? 'default' : 'secondary'}>{challenge.status}</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{challenge.description}</p>
                    <div className="mt-3 text-xs text-muted-foreground space-y-1">
                        <p className="flex items-center"><CalendarClock className="h-3 w-3 mr-1.5"/> Ends: {format(new Date(challenge.endDate), "PP")}</p>
                        <p className="flex items-center"><Users2 className="h-3 w-3 mr-1.5"/> {challenge.participants} Participants</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="default" disabled={challenge.status !== 'active'}>
                      {challenge.status === 'active' ? 'Join Challenge' : (challenge.status === 'upcoming' ? 'View Details' : 'View Results')} 
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forum" className="mt-6">
          <Card>
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-2xl">討論串</CardTitle>
                    <CardDescription>分享技巧、提出問題，並討論所有關於攀岩的事情。</CardDescription>
                </div>
                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> 發起新討論串</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2 mb-4">
                <Input placeholder="搜尋討論串..." className="flex-1"/>
                <Button variant="outline"><Search className="h-4 w-4"/></Button>
              </div>
              <div className="space-y-4">
                {mockForumTopics.map((topic) => (
                  <Link
                    href={`/community/forum/${topic.id}`}
                    key={topic.id}
                    className="block hover:bg-muted/10 rounded-lg transition-colors"
                    legacyBehavior>
                    <Card className="shadow-md hover:shadow-lg">
                      <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={topic.author.avatarUrl} alt={topic.author.name} />
                          <AvatarFallback>{topic.author.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{topic.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                           <Badge variant="outline" className="mt-1 text-xs">{topic.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm text-foreground/90 line-clamp-4">{topic.title}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground pt-2 pb-3 px-4">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-red-500">
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Like</span>
                            </Button>
                             <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-primary">
                                <MessageSquare className="h-4 w-4" />
                                <span className="ml-1">{topic.repliesCount}</span>
                                <span className="sr-only">Replies</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-green-500">
                                <Repeat className="h-4 w-4" />
                                <span className="sr-only">Repost</span>
                            </Button>
                             <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-blue-500">
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Share</span>
                            </Button>
                        </div>
                        <p>
                          最後回覆: {formatDistanceToNow(new Date(topic.lastReplyAt), { addSuffix: true })}
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sponsors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sponsor Leaderboard</CardTitle>
              <CardDescription>Recognizing the generous members supporting our climbers. Only members can sponsor videos.</CardDescription>
            </CardHeader>
            <CardContent>
              {sponsorsLeaderboard.length > 0 ? (
                <div className="space-y-4">
                  {sponsorsLeaderboard.map((sponsor, index) => (
                    <Card key={sponsor.id} className="flex items-center p-4 bg-muted/40 shadow-sm">
                      <div className="flex items-center gap-3 flex-grow">
                        <span className="text-lg font-semibold text-primary w-6 text-center">{index + 1}.</span>
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={sponsor.avatarUrl} alt={sponsor.name} />
                          <AvatarFallback>{sponsor.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{sponsor.name}</p>
                          <p className="text-xs text-muted-foreground">{sponsor.climbingExperience} Climber</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-accent flex items-center">
                           <Coins className="h-5 w-5 mr-1.5 text-yellow-500"/> ${(sponsor.totalSponsoredAmount || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Total Sponsored</p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No sponsors yet. Be the first to support a climber!</p>
              )}
              {currentUser && !currentUser.isMember && (
                 <div className="mt-6 p-4 border-t text-center">
                    <p className="text-muted-foreground mb-2">Want to sponsor climbers and appear on the leaderboard?</p>
                    <Link href="/membership" legacyBehavior>
                        <Button variant="default">
                            <Star className="mr-2 h-4 w-4"/> Become a Member
                        </Button>
                    </Link>
                 </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    