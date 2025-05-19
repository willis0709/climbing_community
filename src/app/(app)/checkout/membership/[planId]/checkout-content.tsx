
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // useParams is not needed if planId is passed as a prop
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard, ArrowLeft, ShoppingBag, Star, Gem, ShieldCheck } from "lucide-react";
import type { SubscriptionPlan } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

// Mock plans data - must match IDs and names from membership page
const plansData: SubscriptionPlan[] = [
  { id: "basecamp-monthly", tier: "Base Camp", name: "Base Camp 基地會員 - 月繳", price: "NT$ 650/月", priceType: "monthly", iconName: "Star", features: [], cta: "" },
  { id: "basecamp-annual", tier: "Base Camp", name: "Base Camp 基地會員 - 年繳", price: "NT$ 7,000/年", priceType: "annual", iconName: "Star", features: [], cta: "" },
  { id: "crux-monthly", tier: "Crux", name: "Crux 核心會員 - 月繳", price: "NT$ 1,350/月", priceType: "monthly", iconName: "Gem", features: [], cta: "" },
  { id: "crux-annual", tier: "Crux", name: "Crux 核心會員 - 年繳", price: "NT$ 14,000/年", priceType: "annual", iconName: "Gem", features: [], cta: "" },
  { id: "summit-monthly", tier: "Summit", name: "Summit 頂峰會員 - 月繳", price: "NT$ 2,800/月", priceType: "monthly", iconName: "ShieldCheck", features: [], cta: "" },
  { id: "summit-annual", tier: "Summit", name: "Summit 頂峰會員 - 年繳", price: "NT$ 30,000/年", priceType: "annual", iconName: "ShieldCheck", features: [], cta: "" },
];

interface CheckoutContentProps {
  planId: string;
}

export default function CheckoutContent({ planId }: CheckoutContentProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (planId) {
      const plan = plansData.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        toast({
          title: "錯誤",
          description: "找不到選擇的方案。",
          variant: "destructive"
        });
        router.push('/membership');
      }
    }
  }, [planId, router, toast]);

  const handlePayment = async () => {
    if (!selectedPlan) return;

    setIsProcessing(true);
    // Simulate API call to Stripe
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/failure
    const paymentSuccess = Math.random() > 0.3; 

    setIsProcessing(false);

    if (paymentSuccess) {
      toast({
        title: "訂閱成功!",
        description: `您已成功訂閱 ${selectedPlan.name}。`,
        variant: "default" // Use "default" variant which is often less intrusive or styled as primary
      });
      router.push(`/payment/success?planName=${encodeURIComponent(selectedPlan.name)}&price=${encodeURIComponent(selectedPlan.price)}`);
    } else {
      toast({
        title: "付款失敗",
        description: `訂閱 ${selectedPlan.name} 時發生問題，請再試一次。`,
        variant: "destructive"
      });
      router.push(`/payment/failure?planName=${encodeURIComponent(selectedPlan.name)}`);
    }
  };

  if (!selectedPlan) {
    // This case should ideally be handled by the Suspense fallback in page.tsx
    // or by the redirect in useEffect if plan is not found after initial load.
    // However, a local loading state might be briefly visible.
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-lg">
      <Card className="shadow-xl">
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={() => router.push('/membership')} className="mb-4 self-start text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回方案選擇
          </Button>
          <CardTitle className="text-3xl font-bold flex items-center">
             <ShoppingBag className="mr-3 h-8 w-8 text-primary" />
            訂閱結帳
          </CardTitle>
          <CardDescription>您即將訂閱 <span className="font-semibold text-primary">{selectedPlan.name}</span>。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">方案詳情</h3>
            <div className="flex justify-between items-center mb-1">
              <span className="text-muted-foreground">方案名稱:</span>
              <span className="font-medium">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">價格:</span>
              <span className="font-bold text-xl text-accent">{selectedPlan.price}</span>
            </div>
             {selectedPlan.priceType === 'annual' && <p className="text-xs text-accent mt-1 text-right">(年繳方案)</p>}
             {selectedPlan.priceType === 'monthly' && <p className="text-xs text-accent mt-1 text-right">(月繳方案)</p>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">支付方式</h3>
            <div className="p-6 border border-dashed rounded-lg text-center text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="font-medium">Stripe 支付表單將顯示於此</p>
              <p className="text-xs mt-1">(此為原型，實際支付表單將在此處整合)</p>
            </div>
             <p className="text-xs text-muted-foreground text-center">
              所有支付均通過 Stripe 安全處理。我們不會儲存您的信用卡資訊。
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => router.push('/membership')} className="w-full sm:w-auto" disabled={isProcessing}>
            取消
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing} className="w-full sm:flex-1">
            {isProcessing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            {isProcessing ? "處理中..." : `確認支付 ${selectedPlan.price.split('/')[0]}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
