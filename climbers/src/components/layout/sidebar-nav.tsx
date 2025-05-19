
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UploadCloud, User, Users, Search, Settings, MountainIcon, Star, Briefcase, Wrench, MessageSquare } from "lucide-react"; // Added MessageSquare
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"; 

const navItems = [
  { href: "/", label: "首頁", icon: Home, tooltip: "儀表板" },
  { href: "/upload", label: "上傳影片", icon: UploadCloud, tooltip: "上傳新的攀岩影片" },
  { href: "/profile", label: "個人資料", icon: User, tooltip: "查看您的個人資料" },
  { href: "/community", label: "社群中心", icon: Users, tooltip: "討論與挑戰" },
  { href: "/search", label: "搜尋影片", icon: Search, tooltip: "尋找攀岩影片" },
  { href: "/coaches", label: "尋找教練", icon: Briefcase, tooltip: "聯繫專業教練" },
  { href: "/shoe-repair", label: "岩鞋維修", icon: Wrench, tooltip: "攀岩鞋維修服務" },
  { href: "/messages", label: "訊息中心", icon: MessageSquare, tooltip: "查看您的訊息" }, // New messages link
];

const secondaryNavItems = [
 { href: "/membership", label: "會員方案", icon: Star, tooltip: "查看會員方案"},
 { href: "/settings", label: "設定", icon: Settings, tooltip: "應用程式設定" },
]

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="flex flex-col h-full">
      <div className="flex-grow">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                variant="default"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/80"
                )}
                tooltip={item.tooltip}
                isActive={pathname === item.href}
              >
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </div>
       <div className="mt-auto"> 
        {secondaryNavItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                variant="default"
                className={cn(
                  "w-full justify-start",
                  pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/80"
                )}
                tooltip={item.tooltip}
                isActive={pathname === item.href}
              >
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </div>
    </SidebarMenu>
  );
}

