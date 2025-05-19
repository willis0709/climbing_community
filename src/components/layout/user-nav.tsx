
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User as UserIcon, Star, Gem, ShieldCheck, Award } from "lucide-react";
import { mockUsers } from "@/lib/mock-data"; 
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/types";
import { useRouter } from "next/navigation";

export function UserNav() {
  const currentUser = mockUsers[0] as User; 
  const router = useRouter();

  const getTierIcon = (tier?: User["membershipTier"]) => {
    switch (tier) {
      case "Base Camp":
        return <Star className="mr-1 h-3 w-3 text-orange-400" />;
      case "Crux":
        return <Gem className="mr-1 h-3 w-3 text-slate-400" />;
      case "Summit":
        return <ShieldCheck className="mr-1 h-3 w-3 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-transparent hover:border-primary transition-colors">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="person avatar" />
            <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{currentUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.climbingExperience}
            </p>
            {currentUser.isMember && currentUser.membershipTier && currentUser.membershipTier !== 'None' && (
              <Badge variant="secondary" className="mt-1.5 self-start px-1.5 py-0.5 text-xs bg-accent/20 text-accent-foreground border-accent/50">
                {getTierIcon(currentUser.membershipTier)} {currentUser.membershipTier} 會員
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile" passHref>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>個人資料</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings" passHref>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>帳號設定</span>
            </DropdownMenuItem>
          </Link>
           <Link href="/membership" passHref>
            <DropdownMenuItem>
              <Award className="mr-2 h-4 w-4" />
              <span>會員方案</span>
            </DropdownMenuItem>
          </Link>
           <DropdownMenuItem disabled>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>付款資訊 (模擬)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>登出</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
