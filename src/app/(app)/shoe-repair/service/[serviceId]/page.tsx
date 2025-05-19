
// This is a placeholder page for a single shoe repair service.
"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wrench, ArrowLeft, Tag, Info, CalendarCheck } from "lucide-react";
import Image from "next/image";

// Helper function to get mock service details based on ID
const getMockServiceDetails = (serviceId: string) => {
  switch (serviceId) {
    case 'half-sole':
      return {
        name: '半底更換',
        description: '更換磨損的岩鞋前半部分鞋底，使用高品質橡膠恢復原有的抓地力和摩擦力。適合鞋底前端嚴重磨損但鞋面尚完好的情況。我們會仔細去除舊底，清潔並打磨接觸面，然後精準黏合新鞋底，確保耐用與性能。',
        price: 'NT$800 - NT$1200 /雙',
        estimatedTime: '約 5-7 工作天',
        beforeAfterImages: [
          { before: "https://placehold.co/300x200.png?text=半底維修前", after: "https://placehold.co/300x200.png?text=半底維修後", dataAiHintBefore: "worn shoe sole", dataAiHintAfter: "repaired shoe sole" }
        ]
      };
    case 'full-sole':
      return {
        name: '全底翻新',
        description: '完整更換整個岩鞋鞋底，包含邊條檢查與必要修補。讓您的愛鞋煥然一新，回到最佳性能狀態。此服務包括徹底清潔鞋子內部，檢查中底結構，並使用原廠或同等級別的材料進行全面修復。',
        price: 'NT$1500 - NT$2000 /雙',
        estimatedTime: '約 7-10 工作天',
        beforeAfterImages: [
          { before: "https://placehold.co/300x200.png?text=全底維修前", after: "https://placehold.co/300x200.png?text=全底維修後", dataAiHintBefore: "old climbing shoe", dataAiHintAfter: "new climbing shoe" }
        ]
      };
    case 'gp-sole':
      return {
        name: 'GP Sole 日本橡膠升級',
        description: '選用頂級日本進口 GP Sole 橡膠進行全底或半底更換，提供無與倫比的摩擦力和耐用度。GP Sole 以其在各種岩面上的卓越表現而聞名，特別適合追求極致性能的攀岩者。此服務為限量供應，建議提前預約。',
        price: 'NT$2000 - NT$2800 /雙',
        estimatedTime: '約 10-14 工作天 (材料需預訂)',
        beforeAfterImages: [
          { before: "https://placehold.co/300x200.png?text=GP+Sole升級前", after: "https://placehold.co/300x200.png?text=GP+Sole升級後", dataAiHintBefore: "climbing shoe detail", dataAiHintAfter: "high-grip sole" }
        ]
      };
    case 'hole-patch':
      return {
        name: '破洞修補',
        description: '針對岩鞋鞋頭、鞋面或邊條的破洞進行專業修補，使用耐磨材料加固，有效防止破損擴大。我們會根據破損位置和程度選擇最合適的修補方案，力求恢復鞋面完整性並延長使用壽命。',
        price: 'NT$300 - NT$600 /處',
        estimatedTime: '約 3-5 工作天',
        beforeAfterImages: [
          { before: "https://placehold.co/300x200.png?text=破洞維修前", after: "https://placehold.co/300x200.png?text=破洞維修後", dataAiHintBefore: "torn shoe fabric", dataAiHintAfter: "patched shoe fabric" }
        ]
      };
    default:
      return {
        name: `維修服務 ${serviceId.replace('-', ' ')} (模擬)`,
        description: "這裡將顯示此維修服務的詳細說明，包含服務範圍、使用的材料、預期效果等。",
        price: "NT$ XXX - NT$ YYY (依實際情況報價)",
        estimatedTime: "約 X-Y 工作天",
        beforeAfterImages: [
          { before: "https://placehold.co/300x200.png?text=維修前", after: "https://placehold.co/300x200.png?text=維修後", dataAiHintBefore: "damaged shoe", dataAiHintAfter: "repaired shoe" }
        ]
      };
  }
};


export default function ShoeRepairServicePage() {
  const params = useParams();
  const serviceId = params?.serviceId as string;
  const serviceDetails = getMockServiceDetails(serviceId);

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader>
          <Button variant="ghost" size="sm" asChild className="mb-4 self-start text-muted-foreground hover:text-foreground">
            <Link href="/shoe-repair" legacyBehavior>
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回維修專區
            </Link>
          </Button>
          <CardTitle className="flex items-center text-2xl md:text-3xl">
            <Wrench className="mr-3 h-7 w-7 text-primary" />
            {serviceDetails.name}
          </CardTitle>
          <CardDescription>
            詳細了解我們的 <span className="font-semibold text-primary">{serviceDetails.name}</span>。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center"><Info className="mr-2 h-5 w-5 text-accent"/>服務說明</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{serviceDetails.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-muted/50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold flex items-center mb-1"><Tag className="mr-2 h-4 w-4 text-accent"/>參考價格:</p>
                <p className="text-foreground/90 text-lg font-medium">{serviceDetails.price}</p>
            </div>
             <div className="bg-muted/50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold flex items-center mb-1"><CalendarCheck className="mr-2 h-4 w-4 text-accent"/>預估工時:</p>
                <p className="text-foreground/90 text-lg font-medium">{serviceDetails.estimatedTime}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">維修前後對比 (模擬圖片)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {serviceDetails.beforeAfterImages.map((img, index) => (
                <div key={index} className="space-y-3">
                  <Card className="overflow-hidden">
                    <CardHeader className="p-0">
                        <p className="text-sm font-medium text-center py-2 bg-muted/50">維修前</p>
                    </CardHeader>
                    <CardContent className="p-2">
                        <Image src={img.before} alt="維修前" width={300} height={200} className="rounded-md w-full object-cover aspect-[3/2]" data-ai-hint={img.dataAiHintBefore} />
                    </CardContent>
                  </Card>
                   <Card className="overflow-hidden">
                    <CardHeader className="p-0">
                         <p className="text-sm font-medium text-center py-2 bg-muted/50">維修後</p>
                    </CardHeader>
                    <CardContent className="p-2">
                        <Image src={img.after} alt="維修後" width={300} height={200} className="rounded-md w-full object-cover aspect-[3/2]" data-ai-hint={img.dataAiHintAfter}/>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">*圖片僅供參考，實際維修效果可能因鞋況而異。</p>
          </div>
          
          <div className="border-t pt-8 text-center">
            <Link
              href={`/shoe-repair/booking?service=${serviceId}`}
              passHref
              legacyBehavior>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
                <CalendarCheck className="mr-2 h-5 w-5" /> 預約此維修服務
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

