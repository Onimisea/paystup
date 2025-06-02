"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Home, Send, Headphones, Receipt } from "lucide-react";

interface SidebarItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
}

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Home",
      isActive: pathname === "/dashboard" || pathname.includes("/dashboard"),
    },
    {
      href: "/send",
      icon: Send,
      label: "Send",
      isActive: pathname === "/send" || pathname.includes("/send"),
    },
    {
      href: "/transactions",
      icon: Receipt,
      label: "Transactions",
      isActive:
        pathname === "/transactions" || pathname.includes("/transactions"),
    },

    {
      href: "/help",
      icon: Headphones,
      label: "Help centre",
      isActive: pathname === "/help" || pathname.includes("/help"),
    },
  ];

  const renderSidebarItem = (item: SidebarItem) => {
    const baseClasses =
      "flex items-center justify-center lg:justify-start gap-0 lg:gap-3 px-2 lg:px-3 py-2 sm:py-3 rounded-lg cursor-pointer transition-colors min-h-touch w-full";
    const activeClasses = "text-primary-green bg-green-50 font-medium";
    const inactiveClasses =
      "text-gray-600 hover:text-primary-green hover:bg-green-50 focus:text-primary-green focus:bg-green-50";

    const classes = `${baseClasses} ${
      item.isActive ? activeClasses : inactiveClasses
    }`;

    return (
      <Link key={item.label} href={item.href} className={classes}>
        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <span className="text-xs sm:text-sm hidden lg:block ml-0 lg:ml-2">
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <div className={`w-12 sm:w-14 lg:w-64 flex-shrink-0 ${className}`}>
      <nav className="flex flex-col gap-1 sm:gap-2">
        {sidebarItems.map(renderSidebarItem)}
      </nav>
    </div>
  );
}
