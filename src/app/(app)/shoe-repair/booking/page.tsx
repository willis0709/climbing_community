
// This is a placeholder page for shoe repair booking.
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck, ArrowLeft } from "lucide-react";

export default function ShoeRepairBookingPage() {
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
           <Button variant="ghost" size="sm" asChild className="mb-4 self-start text-muted-foreground hover:text-foreground">
            <Link href="/shoe-repair">
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回維修專區
            </Link>
          </Button>
          <CardTitle className="flex items-center">
            <CalendarCheck className="mr-3 h-6 w-6 text-primary" />
            預約岩鞋維修 (模擬)
          </CardTitle>
          <CardDescription>
            此頁面為岩鞋維修預約系統的佔位符。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            在這裡，使用者將能夠：
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm pl-4">
            <li>選擇需要的維修服務項目。</li>
            <li>填寫聯絡資訊（姓名、電話、電子郵件）。</li>
            <li>選擇預約時間、門市或寄送方式。</li>
            <li>上傳受損岩鞋的照片以供初步評估。</li>
            <li>進行預付款或完成支付（若有整合支付功能）。</li>
          </ul>
          
          <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground mt-6">
            <p className="font-semibold">預約表單與日曆將顯示於此</p>
            <p className="text-sm mt-1">(此處將整合實際的預約表單和可選時段)</p>
          </div>

           <Button className="w-full mt-6" disabled>
            提交預約 (功能開發中)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
