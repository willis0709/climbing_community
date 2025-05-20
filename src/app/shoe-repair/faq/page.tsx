
// This is a placeholder page for shoe repair FAQs.
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle, ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "我的岩鞋什麼時候需要維修？",
    answer: "當您發現鞋底橡膠磨損嚴重（例如接近或磨到中底）、鞋頭開口笑、或鞋面有破洞時，就應該考慮維修以避免進一步損壞。及早維修通常能以較低成本恢復岩鞋性能。"
  },
  {
    question: "維修會影響岩鞋的性能嗎？",
    answer: "專業的維修會盡力恢復岩鞋的原有性能。使用高品質橡膠甚至可能提升抓地力。但請注意，維修後的腳感可能與全新時略有不同，特別是多次維修的鞋子。"
  },
  {
    question: "我可以選擇維修使用的橡膠品牌嗎？",
    answer: "我們主要使用業界標準的高品質攀岩橡膠。特定品牌（如 Vibram XS Grip2, GP Sole）可供選擇，部分特殊橡膠可能需額外收費或為限量提供。您可以在預約時諮詢可用的橡膠選項。"
  },
  {
    question: "維修需要多長時間？",
    answer: "維修時間因服務項目和目前待修數量而異。一般來說，半底更換約需 5-7 個工作天，全底翻新約需 7-10 個工作天。特殊維修或使用限量材料可能需要更長時間。我們會在收到您的鞋子後提供更準確的預估時間。"
  },
  {
    question: "如何送修我的岩鞋？",
    answer: "您可以透過我們的線上預約系統預約後，將岩鞋郵寄至指定地址，或親臨我們的合作門市送修。詳細的送修指南會在您預約成功後提供。"
  },
  {
    question: "維修費用如何計算？",
    answer: "每項維修服務都有其基礎價格。如果岩鞋有多處損壞或需要特殊處理，我們會在檢查您的鞋子後提供詳細報價。您可以參考我們網站上的價目表或直接諮詢客服。"
  }
];

export default function ShoeRepairFaqPage() {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <Button variant="ghost" size="sm" asChild className="mb-4 self-start text-muted-foreground hover:text-foreground">
            <Link href="/shoe-repair" legacyBehavior>
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回維修專區
            </Link>
          </Button>
          <CardTitle className="flex items-center text-2xl">
            <HelpCircle className="mr-3 h-7 w-7 text-primary" />
            岩鞋維修 - 常見問題 (FAQ)
          </CardTitle>
          <CardDescription>
            解答您關於岩鞋維修的各種疑問。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
