
// This is a placeholder page for Contact Us.
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone, MessageSquare, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input"; // Corrected import path
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; // Ensured Label is imported

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          {/* Optional: Back button if this page is usually accessed from a specific flow */}
          {/* <Button variant="ghost" size="sm" asChild className="mb-4 self-start text-muted-foreground hover:text-foreground">
            <Link href="/"> 
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回
            </Link>
          </Button> */}
          <CardTitle className="flex items-center text-2xl">
            <MessageSquare className="mr-3 h-7 w-7 text-primary" />
            聯絡我們 (Contact Us)
          </CardTitle>
          <CardDescription>
            有任何問題或建議嗎？請透過以下方式與我們聯繫，或填寫下方的表單。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center"><Mail className="mr-2 h-5 w-5 text-accent"/> 電子郵件</h3>
              <p className="text-muted-foreground">
                <a href="mailto:support@climberscommunity.app" className="text-primary hover:underline">
                  support@climberscommunity.app
                </a>
              </p>
              <p className="text-xs text-muted-foreground">一般問題與技術支援</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center"><Phone className="mr-2 h-5 w-5 text-accent"/> 電話 (模擬)</h3>
              <p className="text-muted-foreground">+886 2 1234 5678</p>
              <p className="text-xs text-muted-foreground">服務時間：週一至週五 09:00 - 18:00</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-center md:text-left">或給我們留言</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">您的姓名</Label>
                  <Input id="name" placeholder="請輸入您的姓名" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">您的電子郵件</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">主旨</Label>
                <Input id="subject" placeholder="例如：岩鞋維修諮詢、會員問題" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">訊息內容</Label>
                <Textarea id="message" placeholder="請在此詳細描述您的問題或建議..." rows={5} />
              </div>
              <Button type="submit" className="w-full md:w-auto" disabled>
                <Mail className="mr-2 h-4 w-4" /> 送出訊息 (功能開發中)
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
