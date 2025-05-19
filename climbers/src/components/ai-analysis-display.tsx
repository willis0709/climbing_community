
"use client"; // Added this line

import type { Video } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap } from "lucide-react";

interface AiAnalysisDisplayProps {
  analysis: Video["aiAnalysis"];
}

export function AiAnalysisDisplay({ analysis }: AiAnalysisDisplayProps) {
  if (!analysis) {
    return (
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            AI Analysis
          </CardTitle>
          <CardDescription>No AI analysis available for this video.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Bot className="mr-3 h-7 w-7 text-primary" />
          Automated Route Analysis
        </CardTitle>
        <CardDescription>Powered by Vertical Visions AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-md mb-1 flex items-center">
            <Zap className="mr-2 h-4 w-4 text-accent" />
            Difficulty Rating
          </h3>
          <p className="text-sm text-foreground/80 pl-6">{analysis.difficultyRating}</p>
        </div>
        <div>
          <h3 className="font-semibold text-md mb-1 flex items-center">
            <Zap className="mr-2 h-4 w-4 text-accent" />
            Suggestions & Insights
          </h3>
          <p className="text-sm text-foreground/80 whitespace-pre-line pl-6">{analysis.suggestions}</p>
        </div>
      </CardContent>
    </Card>
  );
}
