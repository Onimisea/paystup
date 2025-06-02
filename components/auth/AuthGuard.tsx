"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user, checkAuthValidity, updateActivity } =
    useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Small delay to allow Zustand to rehydrate from sessionStorage
    const checkAuth = () => {
      console.log("🔐 AuthGuard - Checking authentication:", {
        isAuthenticated,
        hasUser: !!user,
        userEmail: user?.email,
        timestamp: new Date().toISOString(),
      });

      // Check if auth is valid (includes session expiry check)
      const isValidAuth = checkAuthValidity();

      if (!isValidAuth || !isAuthenticated || !user) {
        console.log(
          "❌ AuthGuard - User not authenticated or session expired, redirecting to signin:",
          {
            isAuthenticated,
            hasUser: !!user,
            isValidAuth,
            redirectTo: "/auth/signin",
            timestamp: new Date().toISOString(),
          }
        );

        router.push("/auth/signin");
        return;
      }

      // Update activity timestamp for valid sessions
      updateActivity();

      console.log("✅ AuthGuard - User authenticated, allowing access:", {
        userEmail: user.email,
        userName: user.name,
        authMethod: useAuthStore.getState().authMethod,
        timestamp: new Date().toISOString(),
      });

      setIsChecked(true);
      setIsLoading(false);
    };

    // Allow time for store rehydration
    const timer = setTimeout(checkAuth, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router, checkAuthValidity, updateActivity]);

  // Show loading state while checking authentication
  if (isLoading || !isChecked) {
    return (
      fallback || (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#0BAB7C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#4B5563]">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
