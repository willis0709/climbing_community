
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function FailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [planName, setPlanName] = useState<string | null>(null);

  useEffect(() => {
    setPlanName(searchParams.get('planName'));
  }, [searchParams]);

  const handleRetry = () => {
    // Attempt to go back to the previous page (checkout)
    // If referrer is not available or is a different domain, redirect to membership page
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
      router.back();
    } else {
      router.push('/membership');
    }
  };

  return (
    <div className="container mx-auto py-12 max-w-md flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full shadow-lg text-center">
        <CardHeader>
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">付款失敗</CardTitle>
           {planName && (
            <CardDescription className="text-lg text-muted-foreground mt-2">
              訂閱 <span className="font-semibold text-destructive">{planName}</span> 方案時發生問題。
            </CardDescription>
          )}
          {!planName && <CardDescription className="text-lg text-muted-foreground mt-2">處理您的付款時發生問題。</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
          <p>很抱歉，我們無法處理您的付款。請檢查您的付款資訊並再試一次，或嘗試使用其他付款方式。</p>
          <p className="text-sm text-muted-foreground">如果問題持續存在，請聯繫我們的客服支援。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
             <Button variant="outline" onClick={handleRetry} className="w-full sm:w-auto">
               <RefreshCw className="mr-2 h-4 w-4" /> 重試付款
            </Button>
            <Link href="/membership" passHref legacyBehavior>
              <Button className="w-full sm:w-auto">
                 <ArrowLeft className="mr-2 h-4 w-4" /> 返回方案選擇
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
