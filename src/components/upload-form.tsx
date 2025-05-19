
"use client";

import { useState, type FormEvent, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UploadCloud, CheckCircle, Star, Briefcase, Info } from "lucide-react"; // Changed InfoIcon to Info
import { useToast } from "@/hooks/use-toast";
import { mockUsers, mockVideos } from "@/lib/mock-data"; // Import mockVideos
import type { User, Video } from "@/lib/types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const difficultyLevels = ["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10+"];
const routeTypes = ["抱石", "上攀"];
const experienceLevels = ["Beginner (Up to 1 year)", "Intermediate (1-3 years)", "Advanced (3-5 years)", "Expert (5+ years)"];

const locations = [
  "CORNER Bouldering Gym (台北市)", "市民抱石攀岩館 (台北市)", "奇岩攀岩館 (台北市)", "double8岩究所 (台北市)", "RedRock紅石攀岩 (台北市)", "內湖運動中心攀岩館 (台北市)",
  "原岩攀岩館 (萬華店)", "原岩攀岩館 (南港店)", "原岩攀岩館 (中和店)", "原岩攀岩館 (明德店)", "原岩攀岩館 A19 (桃園市)",
  "MegaSTONE Climbing Gym (新北市)", "Camp4 達文西攀岩館 (新北市)", "永和運動中心攀岩館 (新北市)", "久淘攀岩館 (新北市)", "Wusa攀岩館 (新北市)",
  "千手抱石 (桃園市)", "Passion Climbing 爬森攀岩館 (桃園市)",
  "新竹風城攀岩館 (新竹市)", "新竹紅石攀岩館 (新竹市)",
  "Dapro室內攀岩場 (台中市)", "攀吶攀岩館 (台中市)", "B-plus攀岩館 (台中市)",
  "嗨翻綜合體能館 (台南市)",
  "B-topia攀岩館 (高雄市)", "抱石基地 (高雄市)", "Boulder Space圓石空間攀岩場 (高雄市)", "慶倡攀岩生活館 (高雄市)",
  "久淘攀岩館 (宜蘭市)", "Rockdance舞岩抱石攀岩館 (宜蘭市)"
].sort((a, b) => a.localeCompare(b, 'zh-Hant'));

const MAX_FILE_SIZE = 300 * 1024 * 1024; // 300MB in bytes
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/x-msvideo", "video/x-flv", "video/webm", "video/mpeg"];


const uploadSchema = z.object({
  title: z.string().min(3, "標題至少需 3 個字元"),
  videoFile: z.any()
    .refine(files => files?.[0], "請選擇影片檔案")
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `影片檔案大小不能超過 300MB。`)
    .refine(
      files => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
      "不支援的影片格式。請上傳 MP4, MOV, AVI, FLV, WebM, 或 MPEG 格式的影片。"
    ),
  location: z.string().min(1, "請選擇地點"),
  difficulty: z.string().min(1, "請選擇難度"),
  routeType: z.string().min(1, "請選擇路線類型"),
  description: z.string().optional(),
  climberExperience: z.string().optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export function UploadForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // In a real app, current user would come from auth context
    setCurrentUser(mockUsers[0]);
  }, []);

  const { control, handleSubmit, register, formState: { errors }, watch, setValue, reset } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      videoFile: null,
      location: "",
      difficulty: "",
      routeType: "",
      description: "",
      climberExperience: "",
    }
  });

  const selectedFile = watch("videoFile");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("videoFile", event.target.files, { shouldValidate: true }); // Trigger validation on change
      if (file.size <= MAX_FILE_SIZE && ACCEPTED_VIDEO_TYPES.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setVideoPreview(null); // Clear preview if file is invalid
      }
    } else {
      setVideoPreview(null);
      setValue("videoFile", null, { shouldValidate: true });
    }
  };

  const handleProfessionalReviewSubmit = () => {
     toast({
        title: "Request Submitted (Mock)",
        description: "Your video has been submitted for professional coach review. You'll be notified within 2-3 business days.",
      });
  }

  const onSubmit = async (data: UploadFormData) => {
    setIsSubmitting(true);

    if (!data.videoFile?.[0] || !currentUser) {
      toast({ title: "錯誤", description: "影片檔案或使用者資訊遺失。", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const file = data.videoFile[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const videoDataUriForPreview = reader.result as string;

      console.log("Mock Upload Data:", { ...data, videoFileName: file.name });
      // Simulate API call for upload
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newVideo: Video = {
        id: `video-${Date.now()}`,
        title: data.title,
        thumbnailUrl: 'https://placehold.co/600x400.png', // Placeholder thumbnail
        dataAiHint: 'uploaded video',
        uploader: { // Create UserSummary from currentUser
          id: currentUser.id,
          name: currentUser.name,
          avatarUrl: currentUser.avatarUrl,
        },
        location: data.location,
        difficulty: data.difficulty,
        routeType: data.routeType,
        uploadDate: new Date().toISOString(),
        views: 0,
        description: data.description,
        videoUrl: videoDataUriForPreview, // Use the preview as a mock URL for now
        isExclusive: false,
        comments: [],
        sponsors: [],
        totalSponsorship: 0,
      };

      mockVideos.unshift(newVideo);
      const userInMockData = mockUsers.find(u => u.id === currentUser.id);
      if (userInMockData) {
        if (userInMockData.uploadedVideos) {
          userInMockData.uploadedVideos.unshift(newVideo);
        } else {
          userInMockData.uploadedVideos = [newVideo];
        }
      }

      toast({
        title: "影片上傳成功!",
        description: `「${data.title}」已上傳，現在應該會顯示在首頁和您的個人資料中。(此為原型模擬)`,
        action: <CheckCircle className="text-green-500" />,
      });

      setIsSubmitting(false);
      reset();
      setVideoPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <UploadCloud className="mr-3 h-7 w-7 text-primary" /> 上傳攀岩影片
        </CardTitle>
        <CardDescription>與社群分享您的攀登過程。</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">影片標題</Label>
            <Input id="title" {...register("title")} placeholder="例如：我的精彩紅點" />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoFile">影片檔案</Label>
            <Input
              id="videoFile"
              type="file"
              accept={ACCEPTED_VIDEO_TYPES.join(",")}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
             <p className="text-xs text-muted-foreground mt-1">
              影片將會進行處理以優化播放體驗。檔案大小上限 300MB。支援格式：MP4, MOV, AVI, FLV, WebM, MPEG。
            </p>
            {errors.videoFile && <p className="text-sm text-destructive">{errors.videoFile.message as string}</p>}
            {videoPreview && (
              <div className="mt-2 border rounded-md overflow-hidden">
                <video src={videoPreview} controls className="w-full aspect-video" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">地點</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="選擇地點" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">難度</Label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="選擇難度" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.difficulty && <p className="text-sm text-destructive">{errors.difficulty.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="routeType">路線類型</Label>
               <Controller
                name="routeType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger id="routeType">
                      <SelectValue placeholder="選擇路線類型" />
                    </SelectTrigger>
                    <SelectContent>
                      {routeTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.routeType && <p className="text-sm text-destructive">{errors.routeType.message}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="climberExperience">攀岩者經驗 (選填)</Label>
               <Controller
                name="climberExperience"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger id="climberExperience">
                      <SelectValue placeholder="選擇經驗等級" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述 (選填)</Label>
            <Textarea id="description" {...register("description")} placeholder="關於路線、狀況或您的攀登過程的筆記..." />
          </div>

          <Separator />

          {currentUser?.isMember ? (
            <Card className="bg-accent/10 border-accent/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center"><Star className="mr-2 h-5 w-5 text-accent"/> 會員功能</CardTitle>
                <CardDescription>身為會員，您可以為您的影片請求專業教練的評論。</CardDescription>
              </CardHeader>
              <CardContent>
                <Button type="button" variant="outline" className="w-full" onClick={handleProfessionalReviewSubmit} disabled={isSubmitting}>
                  <Briefcase className="mr-2 h-4 w-4" /> 請求專業教練評論 (模擬)
                </Button>
                 <p className="text-xs text-muted-foreground mt-2 text-center">回覆時間：2-3 個工作天。次數限制可能依會員等級而定。</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-muted/50">
              <CardHeader>
                 <CardTitle className="text-lg flex items-center"><Star className="mr-2 h-5 w-5 text-primary"/> 解鎖更多功能！</CardTitle>
                <CardDescription>成為 Climbers Community 會員以享受專屬福利，例如專業教練評論。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>專業教練評論與詳細回饋</li>
                    <li>觀看會員專屬影片與進階訓練資源</li>
                </ul>
                <div className="pt-2">
                    <Link href="/membership" passHref legacyBehavior>
                        <Button variant="default" className="w-full">了解更多並加入</Button>
                    </Link>
                </div>
              </CardContent>
            </Card>
          )}

        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
           <Button type="submit" disabled={isSubmitting || !selectedFile?.[0]} className="w-full">
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
            {isSubmitting ? "上傳中..." : "上傳影片"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
