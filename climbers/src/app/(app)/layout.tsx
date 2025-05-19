
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarRail } from "@/components/ui/sidebar";
// Removed SheetTitle import as it's handled inside Sidebar for mobile
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Header } from "@/components/layout/header";
import { MountainIcon } from "lucide-react";
import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mobileSidebarTitleId = "mobile-sidebar-title";
  const sidebarTitleString = "Climbers Community"; // Title as a string

  return (
    <SidebarProvider defaultOpen>
      <Sidebar 
        side="left" 
        variant="sidebar" 
        collapsible="icon" 
        className="border-r" 
        titleId={mobileSidebarTitleId} // Used for aria-labelledby
        title={sidebarTitleString} // Passed as string to Sidebar component
      >
        <SidebarHeader className="p-4 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <MountainIcon className="h-7 w-7 text-primary" />
            {/* The visible title for desktop and when mobile sidebar is expanded */}
            <span className="font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden">{sidebarTitleString}</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2 flex-1">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 border-t">
          <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">&copy; {new Date().getFullYear()} Climbers Community</p>
        </SidebarFooter>
      </Sidebar>
      <SidebarRail />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

    