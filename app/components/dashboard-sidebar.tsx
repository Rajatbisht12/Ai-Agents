"use client";

import { cn } from "@/lib/utils";
import { Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <div className={cn(
      "space-y-4 py-4 flex flex-col h-full bg-background border-r"
    )}>
      <div className="px-3 py-2">
        <h2 className={cn(
          "mb-2 px-4 text-lg font-semibold",
          state === "collapsed" && "hidden"
        )}>
          Dashboard
        </h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                state === "collapsed" && "justify-center"
              )}
            >
              <div className={cn(
                "flex items-center",
                state === "collapsed" ? "flex-col gap-y-2" : "flex-1"
              )}>
                <route.icon className={cn(
                  "h-5 w-5",
                  state === "collapsed" ? "mr-0" : "mr-3"
                )} />
                {state !== "collapsed" && route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 