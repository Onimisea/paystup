/**
 * Authentication Query Hooks
 * React Query hooks for authentication-related API calls
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { request } from "../axios-config";
import { queryKeys, invalidateQueries } from "../query-client";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserProfile,
  ApiResponse,
} from "../types";

// Login mutation
export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      const response = await request.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Login successful:", {
        email: data.user.email,
        hasToken: !!data.token,
        timestamp: new Date().toISOString(),
      });

      // Update auth store
      setUser(
        {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          avatar: data.user.avatar,
          country: data.user.country,
        },
        "email",
        data.token
      );

      // Set auth token
      setAuthToken(data.token);

      // Invalidate and refetch user data
      invalidateQueries.user();

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("❌ Login failed:", error);
    },
  });
};

// Register mutation
export const useRegister = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthToken = useAuthStore((state) => state.setAuthToken);

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<AuthResponse> => {
      const response = await request.post<AuthResponse>(
        "/auth/register",
        userData
      );
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Registration successful:", {
        email: data.user.email,
        hasToken: !!data.token,
        timestamp: new Date().toISOString(),
      });

      // Update auth store
      setUser(
        {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          avatar: data.user.avatar,
          country: data.user.country,
        },
        "email",
        data.token
      );

      // Set auth token
      setAuthToken(data.token);

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("❌ Registration failed:", error);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        await request.post("/auth/logout");
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn("⚠️ Logout API call failed, continuing with local logout");
      }
    },
    onSuccess: () => {
      console.log("✅ Logout successful");

      // Clear auth state
      clearAuth();

      // Clear all cached data
      queryClient.clear();

      // Redirect to signin
      router.push("/auth/signin");
    },
    onError: (error) => {
      console.error("❌ Logout error:", error);

      // Still clear auth state even on error
      clearAuth();
      queryClient.clear();
      router.push("/auth/signin");
    },
  });
};

// Get current user profile
export const useUserProfile = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: async (): Promise<UserProfile> => {
      const response = await request.get<UserProfile>("/user/profile");
      return response.data!;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Update user profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      profileData: Partial<UserProfile>
    ): Promise<UserProfile> => {
      const response = await request.patch<UserProfile>(
        "/user/profile",
        profileData
      );
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Profile updated successfully");

      // Update cached profile data
      queryClient.setQueryData(queryKeys.user.profile(), data);

      // Update auth store user data
      const updateUser = useAuthStore.getState().updateUser;
      updateUser({
        name: data.name,
        avatar: data.avatar,
        country: data.country,
      });
    },
    onError: (error) => {
      console.error("❌ Profile update failed:", error);
    },
  });
};

// Upload avatar
export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File): Promise<{ avatarUrl: string }> => {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await request.post<{ avatarUrl: string }>(
        "/user/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Avatar uploaded successfully");

      // Update cached profile data
      const currentProfile = queryClient.getQueryData<UserProfile>(
        queryKeys.user.profile()
      );
      if (currentProfile) {
        queryClient.setQueryData(queryKeys.user.profile(), {
          ...currentProfile,
          avatar: data.avatarUrl,
        });
      }

      // Update auth store
      const updateUser = useAuthStore.getState().updateUser;
      updateUser({ avatar: data.avatarUrl });
    },
    onError: (error) => {
      console.error("❌ Avatar upload failed:", error);
    },
  });
};

// Forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string): Promise<{ message: string }> => {
      const response = await request.post<{ message: string }>(
        "/auth/forgot-password",
        { email }
      );
      return response.data!;
    },
    onSuccess: () => {
      console.log("✅ Password reset email sent");
    },
    onError: (error) => {
      console.error("❌ Forgot password failed:", error);
    },
  });
};

// Reset password
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }): Promise<{ message: string }> => {
      const response = await request.post<{ message: string }>(
        "/auth/reset-password",
        { token, password }
      );
      return response.data!;
    },
    onSuccess: () => {
      console.log("✅ Password reset successful");
      router.push("/auth/signin");
    },
    onError: (error) => {
      console.error("❌ Password reset failed:", error);
    },
  });
};

// Refresh token
export const useRefreshToken = () => {
  const setAuthToken = useAuthStore((state) => state.setAuthToken);

  return useMutation({
    mutationFn: async (): Promise<{ token: string }> => {
      const response = await request.post<{ token: string }>("/auth/refresh");
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Token refreshed successfully");
      setAuthToken(data.token);
    },
    onError: (error) => {
      console.error("❌ Token refresh failed:", error);
      // Clear auth state on refresh failure
      useAuthStore.getState().clearAuth();
    },
  });
};
