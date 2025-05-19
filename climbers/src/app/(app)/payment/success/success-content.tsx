
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // useRouter is not needed here
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, User } from "lucide-react";
import Link from "next/link";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const [planName, setPlanName] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    setPlanName(searchParams.get('planName'));
    setPrice(searchParams.get('price'));
  }, [searchParams]);

  return (
    <div className="container mx-auto py-12 max-w-md flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full shadow-lg text-center">
        <CardHeader>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">付款成功！</CardTitle>
          {planName && price && (
            <CardDescription className="text-lg text-muted-foreground mt-2">
              您已成功訂閱 <span className="font-semibold text-primary">{planName}</span> 方案，費用為 <span className="font-semibold text-primary">{price}</span>。
            </CardDescription>
          )}
           {!planName && !price && <CardDescription className="text-lg text-muted-foreground mt-2">您的付款已成功處理。</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
          <p>感謝您的訂閱！您現在可以享有會員專屬的所有功能與福利。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link href="/" passHref>
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" /> 返回首頁
              </Button>
            </Link>
            <Link href="/profile" passHref>
              <Button className="w-full sm:w-auto">
                <User className="mr-2 h-4 w-4" /> 前往個人資料
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
