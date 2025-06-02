import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthMethod = "email" | "google" | "apple";

export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;
  country?: string;
}

export interface AuthState {
  // State
  isAuthenticated: boolean;
  user: User | null;
  authMethod: AuthMethod | null;
  isLoading: boolean;
  lastActivity: number | null;

  // Actions
  setUser: (user: User, authMethod: AuthMethod) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
  checkAuthValidity: () => boolean;
  updateActivity: () => void;
}

const initialState = {
  isAuthenticated: false,
  user: null,
  authMethod: null,
  isLoading: false,
  lastActivity: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Set user data and mark as authenticated
      setUser: (user: User, authMethod: AuthMethod) => {
        const now = Date.now();

        console.log("🔐 Auth Store - Setting User:", {
          email: user.email,
          name: user.name,
          authMethod,
          timestamp: new Date().toISOString(),
        });

        set({
          isAuthenticated: true,
          user,
          authMethod,
          isLoading: false,
          lastActivity: now,
        });
      },

      // Update user data while maintaining authentication state
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser = { ...currentUser, ...userData };

        console.log("👤 Auth Store - Updating User:", {
          updatedFields: Object.keys(userData),
          timestamp: new Date().toISOString(),
        });

        set({
          user: updatedUser,
        });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Clear authentication state
      clearAuth: () => {
        console.log("🧹 Auth Store - Clearing Auth State:", {
          timestamp: new Date().toISOString(),
        });

        set(initialState);
      },

      // Logout function
      logout: () => {
        const currentUser = get().user;

        console.log("🚪 Auth Store - Logout:", {
          user: currentUser?.email,
          authMethod: get().authMethod,
          timestamp: new Date().toISOString(),
        });

        // Clear the auth state
        get().clearAuth();
      },

      // Check if authentication is still valid
      checkAuthValidity: () => {
        const { isAuthenticated, user, lastActivity } = get();

        if (!isAuthenticated || !user) {
          return false;
        }

        // Check if session is too old (24 hours)
        if (lastActivity && Date.now() - lastActivity > 24 * 60 * 60 * 1000) {
          console.log("🕐 Auth Store - Session expired, clearing auth:", {
            lastActivity: new Date(lastActivity).toISOString(),
            now: new Date().toISOString(),
          });

          get().clearAuth();
          return false;
        }

        return true;
      },

      // Update last activity timestamp
      updateActivity: () => {
        const { isAuthenticated } = get();

        if (isAuthenticated) {
          set({ lastActivity: Date.now() });
        }
      },
    }),
    {
      name: "auth-storage", // name of the item in sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage as requested
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        authMethod: state.authMethod,
        lastActivity: state.lastActivity,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("💾 Auth Store - Rehydrated from sessionStorage:", {
            isAuthenticated: state.isAuthenticated,
            userEmail: state.user?.email,
            authMethod: state.authMethod,
            timestamp: new Date().toISOString(),
          });
        }
      },
    }
  )
);
