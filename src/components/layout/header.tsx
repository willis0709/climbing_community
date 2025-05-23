"use client";

import Link from "next/link";
import { MountainIcon, Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>

      {/* ✅ 修正這段 Link，包一個 div 當單一 child */}
      <Link href="/">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <MountainIcon className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl tracking-tight">Climbers Community</span>
        </div>
      </Link>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-2">
          {/* ✅ 第二段也修正，不再用 legacyBehavior */}
          <Link href="/messages">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Toggle messages</span>
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>

          <UserNav />
        </div>
      </div>
    </header>
  );
}