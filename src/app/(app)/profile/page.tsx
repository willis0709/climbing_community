
"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockUsers, getVideosByUploader, mockTrainingLogs, getUserById as findUserById } from "@/lib/mock-data";
import { ProfileHeader } from "@/components/profile-header";
import { VideoCard } from "@/components/video-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListChecks, Dumbbell, Edit, PlusCircle, BarChartHorizontalBig, Award, Zap, ShieldCheck, Settings, CreditCard, CalendarDays, User as UserIcon } from "lucide-react";
import type { TrainingLogEntry, User, Video } from "@/lib/types";
import { format, formatDistanceToNowStrict } from 'date-fns';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from '@/components/ui/separator';


export default function ProfilePage() {
  const searchParams = useSearchParams();
  const viewingUserId = searchParams.get('userId');

  const [displayedUser, setDisplayedUser] = useState<User | null>(null);
  const [userVideos, setUserVideos] = useState<Video[]>([]);
  const [userTrainingLogs, setUserTrainingLogs] = useState<TrainingLogEntry[]>([]);
  const [autoRenew, setAutoRenew] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(true);

  useEffect(() => {
    let userToDisplay: User | undefined;
    const loggedInUser = mockUsers[0] as User; 

    if (viewingUserId) {
      userToDisplay = findUserById(viewingUserId);
      setIsOwnProfile(viewingUserId === loggedInUser.id);
    } else {
      userToDisplay = loggedInUser;
      setIsOwnProfile(true);
    }
    
    if (userToDisplay) {
      setDisplayedUser(userToDisplay);
      setUserVideos(getVideosByUploader(userToDisplay.id));
      setUserTrainingLogs(userToDisplay.trainingLog || (userToDisplay.id === 'user1' ? mockTrainingLogs.slice(0,3) : []));
      setAutoRenew(isOwnProfile ? true : false);
    } else {
      setDisplayedUser(null);
      console.error("User not found:", viewingUserId);
    }

  }, [viewingUserId, isOwnProfile]);


  if (!displayedUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center">
        <UserIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">User Profile Not Found</h2>
        <p className="text-muted-foreground mb-6">The user profile you are looking for does not exist or could not be loaded.</p>
        <Link href="/" passHref legacyBehavior>
            <Button variant="outline">Go to Homepage</Button>
        </Link>
      </div>
    );
  }

  const defaultTab = "videos"; 
  
  const getMembershipTierDisplayName = (tier?: User["membershipTier"]) => {
    if (!tier || tier === 'None') return "非會員";
    return `${tier} 會員`; 
  }

  const getSubscriptionEndDateFormatted = () => {
    if (!displayedUser.subscriptionEndDate) return "N/A";
    const endDate = new Date(displayedUser.subscriptionEndDate);
    const now = new Date();
    if (endDate < now) {
      return `已過期 (${format(endDate, "yyyy/MM/dd")})`;
    }
    return `${format(endDate, "yyyy/MM/dd")} (剩餘 ${formatDistanceToNowStrict(endDate, {addSuffix: false})})`;
  }


  return (
    <div className="space-y-8">
      <ProfileHeader user={displayedUser} />
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          {(isOwnProfile && displayedUser.isMember && displayedUser.membershipTier !== 'None') && (
            <TabsTrigger value="membership" className="text-sm">
              <Award className="mr-2 h-4 w-4" /> 會員資格
            </TabsTrigger>
          )}
          <TabsTrigger value="videos" className="text-sm">
            <ListChecks className="mr-2 h-4 w-4" /> 影片 ({userVideos.length})
          </TabsTrigger>
          <TabsTrigger value="training" className="text-sm">
            <Dumbbell className="mr-2 h-4 w-4" /> 訓練日誌 ({userTrainingLogs.length})
          </TabsTrigger>
          <TabsTrigger value="achievements" className="text-sm md:col-span-1 col-span-2">
            <BarChartHorizontalBig className="mr-2 h-4 w-4" /> 成就與統計
          </TabsTrigger>
        </TabsList>

        {(isOwnProfile && displayedUser.isMember && displayedUser.membershipTier !== 'None') && (
          <TabsContent value="membership" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                    <Award className="mr-2 h-5 w-5 text-primary" /> 您的會員資格
                </CardTitle>
                <CardDescription>
                  您目前的方案： 
                  <Badge variant="outline" className="mx-1.5 capitalize text-base px-2 py-0.5 border-primary text-primary">
                    {getMembershipTierDisplayName(displayedUser.membershipTier)} ({displayedUser.subscriptionPlan?.includes('annual') ? '年繳' : '月繳'})
                  </Badge> 
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                        <p className="text-muted-foreground flex items-center"><CalendarDays className="mr-1.5 h-4 w-4"/>訂閱到期日:</p>
                        <p className="font-semibold">{getSubscriptionEndDateFormatted()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-muted-foreground flex items-center"><CreditCard className="mr-1.5 h-4 w-4"/>付款方式:</p>
                        <p className="font-semibold">Visa **** 1234 (模擬)</p>
                    </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <Label htmlFor="autoRenewSwitch" className="flex flex-col">
                    <span>自動續訂</span>
                    <span className="text-xs text-muted-foreground">啟用後將在到期時自動扣款續約</span>
                  </Label>
                  <Switch 
                    id="autoRenewSwitch" 
                    checked={autoRenew} 
                    onCheckedChange={setAutoRenew} 
                    aria-label="自動續訂開關"
                  />
                </div>

                <Separator/>
                
                <h3 className="text-lg font-semibold">會員專屬權益 (模擬)</h3>
                <div className="space-y-3">
                    <Card className="bg-muted/50 p-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-md flex items-center"><Zap className="mr-2 h-4 w-4 text-accent"/> 每月定制化訓練計劃</h4>
                            <Button variant="outline" size="sm" disabled={displayedUser.membershipTier !== 'Summit'}>
                                {displayedUser.membershipTier === 'Summit' ? '查看計畫 (模擬)' : '頂峰會員專屬'}
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">根據您的進度和目標量身打造的訓練。 (此為 {getMembershipTierDisplayName(displayedUser.membershipTier)} 福利)</p>
                    </Card>
                    <Card className="bg-muted/50 p-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-md flex items-center"><ShieldCheck className="mr-2 h-4 w-4 text-accent"/> 獨家內容訪問</h4>
                            <Link href="/#exclusive-content-mock" passHref legacyBehavior>
                                <Button variant="outline" size="sm">瀏覽獨家內容</Button>
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">享受會員限定影片、進階教學和路線分析。</p>
                    </Card>
                     <Card className="bg-muted/50 p-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-md flex items-center"><Settings className="mr-2 h-4 w-4 text-accent"/> 新功能搶先體驗</h4>
                             <Button variant="outline" size="sm" disabled={displayedUser.membershipTier !== 'Summit'}>
                                {displayedUser.membershipTier === 'Summit' ? '查看新功能 (模擬)' : '頂峰會員專屬'}
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">優先體驗我們最新的平台功能。</p>
                    </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
                    <Link href="/membership" passHref legacyBehavior>
                        <Button variant="outline">查看所有方案 / 變更方案</Button>
                    </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="videos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>上傳的影片</CardTitle>
              <CardDescription>{displayedUser.name} 分享的攀岩影片。</CardDescription>
            </CardHeader>
            <CardContent>
              {userVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">尚未上傳任何影片。</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>訓練日誌</CardTitle>
                <CardDescription>追蹤您的訓練進度和成果。</CardDescription>
              </div>
              {isOwnProfile && <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> 新增紀錄</Button>}
            </CardHeader>
            <CardContent className="space-y-4">
              {userTrainingLogs.length > 0 ? (
                userTrainingLogs.map((log) => (
                  <Card key={log.id} className="bg-muted/50 p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{format(new Date(log.date), "PPP (eee)")}</p>
                        <p className="text-sm text-muted-foreground">
                          {log.duration && `時長: ${log.duration}`}
                          {log.duration && log.intensity && " | "}
                          {log.intensity && `強度: ${log.intensity}`}
                        </p>
                      </div>
                      {isOwnProfile && 
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                        </Button>
                      }
                    </div>
                    <p className="mt-2 text-sm text-foreground/90">{log.notes}</p>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">尚未記錄任何訓練日誌。</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>成就與統計</CardTitle>
              <CardDescription>{displayedUser.name} 的攀登里程碑和統計數據。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {displayedUser.achievements && displayedUser.achievements.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {displayedUser.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm">{achievement}</li>
                  ))}
                </ul>
              ) : (
                 <p className="text-muted-foreground">尚未列出具體成就。</p>
              )}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">攀登統計 (模擬)</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>最難紅點: <span className="font-semibold">5.14a</span></p>
                    <p>最難完攀: <span className="font-semibold">5.13b</span></p>
                    <p>總攀登路線: <span className="font-semibold">350+</span></p>
                    <p>最愛岩場: <span className="font-semibold">El Capitan</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
