
import { MembershipCard } from "@/components/membership-card";
import type { SubscriptionPlan } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

const plans: SubscriptionPlan[] = [
  // Base Camp Tiers (Formerly Bronze)
  {
    id: "basecamp-monthly",
    tier: "Base Camp",
    name: "Base Camp 基地會員 - 月繳",
    price: "NT$ 650/月", // Example price from range
    priceType: "monthly",
    iconName: "Star",
    features: [
      "每月一次影片分析",
      "10% 教練諮詢折扣",
      "基本社群區域訪問",
      "每年一次優惠券",
    ],
    cta: "選擇月繳基地會員",
  },
  {
    id: "basecamp-annual",
    tier: "Base Camp",
    name: "Base Camp 基地會員 - 年繳",
    price: "NT$ 7,000/年", // Example price from range
    priceType: "annual",
    annualEquivalentPrice: "(約 NT$ 583/月)",
    iconName: "Star",
    features: [
      "每月一次影片分析",
      "10% 教練諮詢折扣",
      "基本社群區域訪問",
      "每年一次優惠券",
      "年繳優惠：節省更多！",
    ],
    cta: "選擇年繳基地會員",
  },
  // Crux Tiers (Formerly Silver)
  {
    id: "crux-monthly",
    tier: "Crux",
    name: "Crux 核心會員 - 月繳",
    price: "NT$ 1,350/月", // Example price from range
    priceType: "monthly",
    iconName: "Gem",
    features: [
      "每月五次影片分析", // Updated
      "15% 教練諮詢折扣",
      "高級社群區域訪問",
      "每季度專屬網絡研討會",
      "每年生日禮包",
    ],
    cta: "選擇月繳核心會員",
  },
  {
    id: "crux-annual",
    tier: "Crux",
    name: "Crux 核心會員 - 年繳",
    price: "NT$ 14,000/年", // Example price from range
    priceType: "annual",
    annualEquivalentPrice: "(約 NT$ 1,167/月)",
    iconName: "Gem",
    features: [
      "每月五次影片分析", // Updated
      "15% 教練諮詢折扣",
      "高級社群區域訪問",
      "每季度專屬網絡研討會",
      "每年生日禮包",
      "年繳優惠：節省更多！",
    ],
    cta: "選擇年繳核心會員",
  },
  // Summit Tiers (Formerly Gold)
  {
    id: "summit-monthly",
    tier: "Summit",
    name: "Summit 頂峰會員 - 月繳",
    price: "NT$ 2,800/月", // Example price from range
    priceType: "monthly",
    iconName: "ShieldCheck",
    features: [
      "無限制影片分析",
      "20% 教練諮詢折扣",
      "VIP教練諮詢預約",
      "高級專屬社群區域",
      "每年一次專屬活動與體驗",
      "每月定制化訓練計劃",
      "先行體驗新功能",
    ],
    cta: "選擇月繳頂峰會員",
  },
  {
    id: "summit-annual",
    tier: "Summit",
    name: "Summit 頂峰會員 - 年繳",
    price: "NT$ 30,000/年", // Example price from range
    priceType: "annual",
    annualEquivalentPrice: "(約 NT$ 2,500/月)",
    iconName: "ShieldCheck",
    features: [
      "無限制影片分析",
      "20% 教練諮詢折扣",
      "VIP教練諮詢預約",
      "高級專屬社群區域",
      "每年一次專屬活動與體驗",
      "每月定制化訓練計劃",
      "先行體驗新功能",
      "年繳優惠：終極節省！",
    ],
    cta: "選擇年繳頂峰會員",
  },
];

export default function MembershipPage() {
  return (
    <div className="space-y-10">
      <Card className="text-center py-10 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="text-4xl font-bold flex items-center justify-center">
             <Zap className="mr-3 h-10 w-10 text-accent" />
            會員方案
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            選擇最適合您的攀岩旅程方案，解鎖專屬功能。
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <MembershipCard key={plan.id} plan={plan} />
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle>常見問題</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><strong>問：我可以隨時取消訂閱嗎？</strong></p>
            <p>答：是的，您可以隨時取消您的月繳或年繳訂閱。您的會員權益將持續到目前計費週期結束為止。</p>
            <p><strong>問：什麼是專業教練分析？</strong></p>
            <p>答：我們的認證攀岩教練將親自審閱您提交的影片，提供關於技巧、策略和改進方向的詳細回饋。</p>
             <p><strong>問：影片贊助是如何運作的？</strong></p>
            <p>答：作為會員，您可以通過贊助影片來支持攀岩者。您的贊助幫助他們持續創作內容，您也會獲得感謝！</p>
            <p><strong>問：不同會員等級有哪些主要差異？</strong></p>
            <p>答：主要差異在於影片分析次數、教練諮詢折扣、社群訪問權限以及專屬活動和福利。Summit 頂峰會員享有最全面的服務。</p>
        </CardContent>
      </Card>
    </div>
  );
}
