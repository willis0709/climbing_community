
"use client";

import type { SubscriptionPlan } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Gem, ShieldCheck, ArrowRight, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface MembershipCardProps {
  plan: SubscriptionPlan;
}

const getIconComponent = (iconName?: SubscriptionPlan["iconName"]): React.ElementType | null => {
  if (!iconName) return Award; 
  switch (iconName) {
    case "Star": // Base Camp
      return Star;
    case "Gem": // Crux
      return Gem;
    case "ShieldCheck": // Summit
      return ShieldCheck;
    case "Award":
      return Award;
    default:
      return Award;
  }
};

export function MembershipCard({ plan }: MembershipCardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const IconComponent = getIconComponent(plan.iconName);

  const handleSubscribe = () => {
    router.push(`/checkout/membership/${plan.id}`);
  };

  const isPopular = plan.tier === 'Crux' && plan.priceType === 'annual';

  return (
    <Card className={cn(
      "flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 h-full",
      isPopular && "border-2 border-primary ring-2 ring-primary/50 relative"
    )}>
      {isPopular && (
        <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md transform rotate-12">
          推薦
        </div>
      )}
      <CardHeader className="items-center text-center p-6 bg-muted/30">
        {IconComponent && <IconComponent className={cn("h-12 w-12 mb-3", 
          plan.tier === "Base Camp" && "text-orange-400", // Star color for Base Camp
          plan.tier === "Crux" && "text-slate-400",      // Gem color for Crux
          plan.tier === "Summit" && "text-yellow-500"     // ShieldCheck color for Summit
          )} />}
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription className="text-2xl font-bold text-primary">{plan.price}</CardDescription>
        {plan.annualEquivalentPrice && <p className="text-xs text-muted-foreground">{plan.annualEquivalentPrice}</p>}
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 border-t mt-auto">
        <Button 
          className="w-full" 
          onClick={handleSubscribe} 
          size="lg" 
          variant={plan.tier === 'Summit' ? 'default' : (plan.tier === 'Crux' ? 'default' : 'outline')}
        >
          {plan.cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
