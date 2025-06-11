"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Home, Send, Wallet, Headphones, Receipt } from "lucide-react";

interface MobileMenuItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
}

interface MobileMenuProps {
  className?: string;
}

export default function MobileMenu({ className = "" }: MobileMenuProps) {
  const pathname = usePathname();

  const menuItems: MobileMenuItem[] = [
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
      label: "Help",
      isActive: pathname === "/help" || pathname.includes("/help"),
    },
  ];

  const renderMenuItem = (item: MobileMenuItem) => {
    const baseClasses =
      "flex items-center justify-center p-3 rounded-full cursor-pointer transition-all duration-200 min-h-[56px] min-w-[56px] relative group";

    const activeClasses = "text-white bg-[#0BAB7C]";
    const inactiveClasses = "text-gray-600 bg-white";

    const classes = `${baseClasses} ${
      item.isActive ? activeClasses : inactiveClasses
    }`;

    return (
      <Link key={item.label} href={item.href} className={classes}>
        {/* Hover/Focus background overlay for inactive items */}
        {!item.isActive && (
          <div className="absolute inset-0 rounded-full bg-[#0BAB7C] opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200" />
        )}

        {/* Icon */}
        <item.icon
          className={`w-6 h-6 relative z-10 transition-colors duration-200 ${
            item.isActive
              ? "text-white"
              : "text-gray-600 group-hover:text-white group-focus:text-white"
          }`}
        />

        {/* Tooltip for hover/focus states only */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#0BAB7C] text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none">
          {item.label}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0BAB7C]"></div>
        </div>
      </Link>
    );
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 md:hidden z-50 animate-in slide-in-from-bottom duration-300 ${className}`}
    >
      <nav className="flex items-center justify-center gap-3">
        {menuItems.map(renderMenuItem)}
      </nav>
    </div>
  );
}
