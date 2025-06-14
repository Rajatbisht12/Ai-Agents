"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import DashboardNavbar from "./dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar";
import { useSidebar, Sidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  Bell,
  Settings
} from "lucide-react";





export default function DashboardContent() {
  const { state } = useSidebar();

  return (
    <div className="h-screen w-full relative bg-gray-50/30">
      <Sidebar collapsible="icon">
        <DashboardSidebar />
      </Sidebar>
      
      <main className={cn(
        "h-full w-full overflow-y-auto transition-all duration-300 ease-in-out",
        state === "collapsed" ? "md:pl-12" : "md:pl-64"
      )}>
        {/* Header */}
        <div className="h-16 border-b bg-white/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10 w-full">
          <DashboardNavbar />
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
            <SignOutButton>
              <Button variant="outline" size="sm">Sign Out</Button>
            </SignOutButton>
          </div>
        </div>
      </main>
    </div>
  );
}