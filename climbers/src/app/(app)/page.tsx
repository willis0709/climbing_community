
"use client";

import { useState, useEffect } from "react";
import { VideoCard } from "@/components/video-card";
import { mockVideos } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, ListFilter, XCircle } from "lucide-react"; // Added XCircle
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Video } from "@/lib/types";

const locations = [
  // 北部地區
  "CORNER Bouldering Gym (台北市)", "市民抱石攀岩館 (台北市)", "奇岩攀岩館 (台北市)", "double8岩究所 (台北市)", "RedRock紅石攀岩 (台北市)", "內湖運動中心攀岩館 (台北市)",
  "原岩攀岩館 (萬華店)", "原岩攀岩館 (南港店)", "原岩攀岩館 (明德店)", "原岩攀岩館 (中和店)",
  "MegaSTONE Climbing Gym (新北市)", "Camp4 達文西攀岩館 (新北市)", "永和運動中心攀岩館 (新北市)", "久淘攀岩館 (新北市)", "Wusa攀岩館 (新北市)",
  "原岩攀岩館 A19 (桃園市)", "千手抱石 (桃園市)", "Passion Climbing 爬森攀岩館 (桃園市)",
  // 中部地區
  "新竹風城攀岩館 (新竹市)", "新竹紅石攀岩館 (新竹市)",
  "Dapro室內攀岩場 (台中市)", "攀吶攀岩館 (台中市)", "B-plus攀岩館 (台中市)",
  // 南部地區
  "嗨翻綜合體能館 (台南市)",
  "B-topia攀岩館 (高雄市)", "抱石基地 (高雄市)", "Boulder Space圓石空間攀岩場 (高雄市)", "慶倡攀岩生活館 (高雄市)",
  // 東部地區
  "久淘攀岩館 (宜蘭市)", "Rockdance舞岩抱石攀岩館 (宜蘭市)"
].sort((a, b) => a.localeCompare(b, 'zh-Hant'));

const difficulties = ["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10+"];
const routeTypes = ["抱石", "上攀"];

// Define unique values for "All" options to avoid empty string in SelectItem
const ALL_LOCATIONS_VALUE_HOME = "__ALL_LOCATIONS_HOME__";
const ALL_DIFFICULTIES_VALUE_HOME = "__ALL_DIFFICULTIES_HOME__";
const ALL_ROUTE_TYPES_VALUE_HOME = "__ALL_ROUTE_TYPES_HOME__";

export default function HomePage() {
  const popularVideosBase: Video[] = [...mockVideos].sort((a, b) => b.views - a.views);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [routeTypeFilter, setRouteTypeFilter] = useState("");
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>(popularVideosBase);

  const applyFilters = () => {
    let videos = popularVideosBase;

    if (searchTerm) {
      videos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.uploader.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (locationFilter) {
      videos = videos.filter(video => video.location.includes(locationFilter.split(" (")[0]));
    }
    if (difficultyFilter) {
      videos = videos.filter(video => video.difficulty.startsWith(difficultyFilter.split('-')[0]) || video.difficulty === difficultyFilter);
    }
    if (routeTypeFilter) {
      videos = videos.filter(video => video.routeType === routeTypeFilter);
    }
    setDisplayedVideos(videos);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setDifficultyFilter("");
    setRouteTypeFilter("");
    // applyFilters will be called by useEffect
  };

  // Apply filters whenever a filter state changes
  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, locationFilter, difficultyFilter, routeTypeFilter]);


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>篩選影片</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="依標題、上傳者搜尋影片..." 
            className="max-w-md" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              value={locationFilter}
              onValueChange={(selectedValue) => {
                const newLocationFilter = selectedValue === ALL_LOCATIONS_VALUE_HOME ? "" : selectedValue;
                setLocationFilter(newLocationFilter);
                // Reset route type filter when location changes
                setRouteTypeFilter(""); 
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="地點" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_LOCATIONS_VALUE_HOME}>所有地點</SelectItem>
                {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select
              value={difficultyFilter}
              onValueChange={(selectedValue) => {
                setDifficultyFilter(selectedValue === ALL_DIFFICULTIES_VALUE_HOME ? "" : selectedValue);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="難度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_DIFFICULTIES_VALUE_HOME}>所有難度</SelectItem>
                {difficulties.map(diff => <SelectItem key={diff} value={diff}>{diff}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select
              value={routeTypeFilter}
              onValueChange={(selectedValue) => {
                setRouteTypeFilter(selectedValue === ALL_ROUTE_TYPES_VALUE_HOME ? "" : selectedValue);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="路線類型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_ROUTE_TYPES_VALUE_HOME}>所有路線類型</SelectItem>
                {routeTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex gap-2 lg:col-start-4">
              <Button onClick={applyFilters} className="flex-1">
                <Filter className="mr-2 h-4 w-4" />
                套用篩選
              </Button>
              <Button onClick={clearFilters} variant="outline" className="flex-1">
                <XCircle className="mr-2 h-4 w-4" />
                清除
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-6">熱門影片 ({displayedVideos.length})</h2>
        {displayedVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
           <div className="text-center py-10 bg-muted/30 rounded-lg">
            <p className="text-lg text-muted-foreground">目前沒有符合您篩選條件的影片。</p>
            <p className="text-sm text-muted-foreground mt-2">請嘗試調整您的搜尋條件或清除篩選器。</p>
          </div>
        )}
      </div>
    </div>
  );
}
