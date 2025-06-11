"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, User, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Fallback user data if not in store (for backward compatibility)
  const displayUser = user || {
    name: "David Smith",
    email: "david@example.com",
    avatar: "DS",
  };

  const handleLogout = async () => {
    try {
      console.log("🚪 Header - Logout initiated:", {
        user: displayUser.email,
        timestamp: new Date().toISOString(),
      });

      // Clear auth store first
      logout();

      // Sign out from Better Auth
      await signOut();

      console.log("✅ Header - Logout Success:", {
        timestamp: new Date().toISOString(),
        redirectTo: "/auth/signin",
      });

      // Redirect to auth signin page after logout
      router.push("/auth/signin");
    } catch (error) {
      console.error("❌ Header - Logout Error:", error);

      // Even if Better Auth logout fails, clear local state and redirect
      logout();
      router.push("/auth/signin");
    }
  };

  return (
    <div className={`bg-transparent py-3 sm:py-4 lg:py-5 ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          {/* Logo - Same as signin page */}
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-[#0BAB7C] rounded-lg flex items-center justify-center hover:bg-[#0BAB7C]/90 transition-colors">
                <span className="text-white font-bold text-sm sm:text-base lg:text-lg">
                  P
                </span>
              </div>
            </Link>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <div className="p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer min-h-touch min-w-touch flex items-center justify-center">
              <Bell className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-gray-50 focus:bg-gray-50 rounded-lg px-2 py-2 transition-colors min-h-touch">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {displayUser.avatar ||
                      displayUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {displayUser.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Profile Menu Item */}
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout Menu Item */}
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
