
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wrench, MessageSquareQuote, CalendarCheck, ArrowRight, Star, AlertTriangle, CheckCircle, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const repairServices = [
  { 
    id: 'half-sole', 
    name: '半底更換', 
    description: '更換磨損的岩鞋前半部分鞋底，使用高品質橡膠恢復原有的抓地力和摩擦力。適合鞋底前端嚴重磨損但鞋面尚完好的情況。', 
    priceRange: 'NT$800 - NT$1200 /雙', 
    estimatedTime: '約 5-7 工作天', 
    imageUrl: 'https://placehold.co/600x400.png', 
    dataAiHint: 'shoe sole',
    features: ["恢復抓地力", "延長岩鞋壽命", "經濟實惠選擇"]
  },
  { 
    id: 'full-sole', 
    name: '全底翻新', 
    description: '完整更換整個岩鞋鞋底，包含邊條檢查與必要修補。讓您的愛鞋煥然一新，回到最佳性能狀態。', 
    priceRange: 'NT$1500 - NT$2000 /雙', 
    estimatedTime: '約 7-10 工作天', 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'shoe repair',
    features: ["完整性能恢復", "包含邊條處理", "全面翻新體驗"]
  },
  { 
    id: 'gp-sole', 
    name: 'GP Sole 日本橡膠升級 (限量)', 
    description: '選用頂級日本進口 GP Sole 橡膠進行全底或半底更換，提供無與倫比的摩擦力和耐用度。限量供應，需提前預約。', 
    priceRange: 'NT$2000 - NT$2800 /雙', 
    estimatedTime: '約 10-14 工作天', 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'rubber sole',
    features: ["頂級日本橡膠", "極致摩擦力", "限量升級選項"]
  },
  { 
    id: 'hole-patch', 
    name: '破洞修補', 
    description: '針對岩鞋鞋頭、鞋面或邊條的破洞進行專業修補，使用耐磨材料加固，有效防止破損擴大。', 
    priceRange: 'NT$300 - NT$600 /處', 
    estimatedTime: '約 3-5 工作天', 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'shoe patch',
    features: ["專業破損修復", "耐磨材料加固", "防止破損擴大"]
  },
  { 
    id: 'special', 
    name: '其他特殊維修', 
    description: '包含鞋帶環更換、魔鬼氈維修、鞋面小範圍清潔保養等。請提供照片或親洽門市評估。', 
    priceRange: '專案報價', 
    estimatedTime: '視情況而定', 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'shoe parts',
    features: ["客製化維修", "細部問題處理", "專業諮詢評估"]
  },
];

const mockReviews = [
  { id: 'r1', userName: '攀岩小王子', userAvatar: 'https://placehold.co/40x40.png', rating: 5, comment: '維修品質超棒！我的 La Sportiva Solution 像新的一樣！GP Sole 黏到不行！', date: '2024-07-15' },
  { id: 'r2', userName: '山貓莉莉', userAvatar: 'https://placehold.co/40x40.png', rating: 4, comment: '半底更換很划算，鞋子又能再戰好幾個月了。下次想試試全底翻新。', date: '2024-07-10' },
  { id: 'r3', userName: '新手阿明', userAvatar: 'https://placehold.co/40x40.png', rating: 5, comment: '鞋頭破了個小洞，補得幾乎看不出來，非常專業！客服回覆也很快。', date: '2024-06-28' },
];

export default function ShoeRepairPage() {
  return (
    <div className="space-y-10">
      <Card className="text-center py-10 bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg">
        <CardHeader>
          <Wrench className="mx-auto h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-4xl font-bold">岩鞋維修專區</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            您的攀岩夥伴值得最好的呵護！我們提供專業的岩鞋維修服務，從鞋底更換到破損修補，讓您的愛鞋重獲新生，再戰岩壁。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/shoe-repair/booking" passHref legacyBehavior>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
              <CalendarCheck className="mr-2 h-5 w-5" /> 快速預約維修
            </Button>
          </Link>
        </CardContent>
      </Card>
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">我們的維修服務</h2>
          <p className="text-muted-foreground mt-1">專業細緻，讓岩鞋恢復最佳狀態。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {repairServices.map((service) => (
            <Card key={service.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image src={service.imageUrl} alt={service.name} layout="fill" objectFit="cover" data-ai-hint={service.dataAiHint} />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">{service.description}</p>
                <ul className="space-y-1 text-sm">
                  {service.features?.map(feature => (
                    <li key={feature} className="flex items-center text-foreground/80">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div>
                  <p className="text-sm font-semibold text-primary">價格：{service.priceRange}</p>
                  <p className="text-xs text-muted-foreground">預估工時：{service.estimatedTime}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/shoe-repair/service/${service.id}`}
                  passHref
                  className="w-full"
                  legacyBehavior>
                  <Button variant="outline" className="w-full">
                    查看詳情 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <Separator />
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">維修流程</h2>
          <p className="text-muted-foreground mt-1">簡單幾步，輕鬆搞定您的岩鞋維修需求。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Card className="p-6">
                <CardHeader><CardTitle className="text-lg flex items-center justify-center"><span className="text-3xl font-bold text-primary mr-2">1</span> 線上預約/諮詢</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">選擇服務項目，填寫維修需求，或上傳照片初步評估。</p></CardContent>
            </Card>
             <Card className="p-6">
                <CardHeader><CardTitle className="text-lg flex items-center justify-center"><span className="text-3xl font-bold text-primary mr-2">2</span> 寄送/親送岩鞋</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">將您的愛鞋寄至指定地點，或親臨我們的合作門市。</p></CardContent>
            </Card>
             <Card className="p-6">
                <CardHeader><CardTitle className="text-lg flex items-center justify-center"><span className="text-3xl font-bold text-primary mr-2">3</span> 專業維修與取回</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">我們的師傅將進行專業維修，完成後通知您取回或寄回。</p></CardContent>
            </Card>
        </div>
      </section>
      <Separator />
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">客戶怎麼說？</h2>
          <p className="text-muted-foreground mt-1">真實評價，品質保證。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockReviews.map((review) => (
            <Card key={review.id} className="p-6 shadow-sm bg-muted/30">
              <CardHeader className="flex flex-row items-center gap-3 p-0 mb-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={review.userAvatar} alt={review.userName} data-ai-hint="person avatar" />
                  <AvatarFallback>{review.userName.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-foreground/90 italic">"{review.comment}"</p>
                <p className="text-xs text-muted-foreground mt-2 text-right">- {new Date(review.date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
            <Button variant="link">查看更多評價 <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </div>
      </section>
      <Separator />
      <section className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-semibold">常見問題 (FAQ)</h2>
            <p className="text-muted-foreground mt-1">解答您關於岩鞋維修的疑問。</p>
        </div>
        <Card>
            <CardContent className="p-6 space-y-4">
                <div>
                    <h4 className="font-semibold">Q: 我的岩鞋什麼時候需要維修？</h4>
                    <p className="text-sm text-muted-foreground">A: 當您發現鞋底橡膠磨損嚴重（例如接近或磨到中底）、鞋頭開口笑、或鞋面有破洞時，就應該考慮維修以避免進一步損壞。</p>
                </div>
                <div>
                    <h4 className="font-semibold">Q: 維修會影響岩鞋的性能嗎？</h4>
                    <p className="text-sm text-muted-foreground">A: 專業的維修會盡力恢復岩鞋的原有性能。使用高品質橡膠甚至可能提升抓地力。但請注意，維修後的腳感可能與全新時略有不同。</p>
                </div>
                 <div>
                    <h4 className="font-semibold">Q: 我可以選擇維修使用的橡膠品牌嗎？</h4>
                    <p className="text-sm text-muted-foreground">A: 我們主要使用業界標準的高品質攀岩橡膠。特定品牌（如 Vibram XS Grip2, GP Sole）可供選擇，部分特殊橡膠可能需額外收費或為限量提供。</p>
                </div>
                <div className="text-center mt-4">
                     <Link href="/shoe-repair/faq" passHref legacyBehavior>
                        <Button variant="outline">查看所有常見問題</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
      </section>
      <Separator />
      <section className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-semibold flex items-center justify-center">
                <AlertTriangle className="mr-3 h-8 w-8 text-primary" />
                維修前重要須知
            </h2>
            <p className="text-muted-foreground mt-1">送修您的愛鞋前，請先閱讀以下重要資訊，以確保維修順利。</p>
        </div>
        <Card>
            <CardContent className="p-6 space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                    <li><strong>清潔您的岩鞋：</strong> 請確保送修的岩鞋是乾淨且乾燥的，這有助於維修師傅更好地評估和作業。</li>
                    <li><strong>移除個人物品：</strong> 請移除鞋帶（除非鞋帶也需維修）、鞋墊或其他個人配件。</li>
                    <li><strong>詳細描述問題：</strong> 預約時或送修時，請盡可能詳細地描述岩鞋的損壞情況及您的維修期望。</li>
                    <li><strong>了解維修極限：</strong> 雖然我們盡力修復，但部分嚴重損壞的岩鞋可能無法完美恢復原狀。我們會事先與您溝通。</li>
                    <li><strong>預估工時：</strong> 各項維修服務的預估工時僅供參考，實際完成時間可能因待修數量及鞋況而有所調整。</li>
                </ul>
            </CardContent>
        </Card>
      </section>
      <Card className="bg-primary/5 border-primary/20 p-6 md:p-8 text-center">
        <CardTitle className="text-2xl mb-3">準備好讓您的愛鞋重獲新生了嗎？</CardTitle>
        <CardDescription className="text-muted-foreground mb-6 max-w-xl mx-auto">
          無論是日常練習還是挑戰極限，一雙狀態良好的岩鞋都是您最佳的夥伴。立即預約我們的專業維修服務！
        </CardDescription>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shoe-repair/booking" passHref legacyBehavior>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <CalendarCheck className="mr-2 h-5 w-5" /> 預約維修服務
                </Button>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
                <Button size="lg" variant="outline">
                    <MessageSquareQuote className="mr-2 h-5 w-5" /> 聯繫我們諮詢
                </Button>
            </Link>
        </div>
      </Card>
    </div>
  );
}

    