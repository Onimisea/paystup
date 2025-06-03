/**
 * React Query Configuration
 * Query client setup with caching, background refetching, and error handling
 */

import { QueryClient, DefaultOptions } from "@tanstack/react-query";
import { ApiError } from "./types";

// Default query options
const defaultQueryOptions: DefaultOptions = {
  queries: {
    // Stale time - how long data is considered fresh (5 minutes)
    staleTime: 5 * 60 * 1000,

    // Cache time - how long data stays in cache when not in use (10 minutes)
    gcTime: 10 * 60 * 1000,

    // Retry configuration
    retry: (failureCount, error) => {
      const apiError = error as unknown as ApiError;

      // Don't retry on 4xx errors (client errors)
      if (apiError.status >= 400 && apiError.status < 500) {
        return false;
      }

      // Retry up to 3 times for other errors
      return failureCount < 3;
    },

    // Retry delay with exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // Background refetching
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,

    // Error handling
    throwOnError: false,

    // Network mode
    networkMode: "online",
  },
  mutations: {
    // Retry mutations only on network errors
    retry: (failureCount, error) => {
      const apiError = error as unknown as ApiError;

      // Only retry on network errors or 5xx server errors
      if (!apiError.status || apiError.status >= 500) {
        return failureCount < 2;
      }

      return false;
    },

    // Retry delay for mutations
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),

    // Network mode
    networkMode: "online",
  },
};

// Create query client instance
export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});

// Query key factory for consistent key generation
export const queryKeys = {
  // Authentication
  auth: {
    user: () => ["auth", "user"] as const,
    session: () => ["auth", "session"] as const,
  },

  // User profile
  user: {
    all: () => ["user"] as const,
    profile: () => ["user", "profile"] as const,
    settings: () => ["user", "settings"] as const,
    notifications: (filters?: any) =>
      ["user", "notifications", filters] as const,
  },

  // Transactions
  transactions: {
    all: () => ["transactions"] as const,
    list: (filters?: any) => ["transactions", "list", filters] as const,
    detail: (id: string) => ["transactions", "detail", id] as const,
    summary: () => ["transactions", "summary"] as const,
  },

  // Exchange rates
  exchangeRates: {
    all: () => ["exchange-rates"] as const,
    pair: (from: string, to: string) => ["exchange-rates", from, to] as const,
    convert: (from: string, to: string, amount: number) =>
      ["exchange-rates", "convert", from, to, amount] as const,
  },

  // KYC
  kyc: {
    all: () => ["kyc"] as const,
    status: () => ["kyc", "status"] as const,
    documents: () => ["kyc", "documents"] as const,
  },

  // Countries and banks
  countries: {
    all: () => ["countries"] as const,
    banks: (countryCode: string) =>
      ["countries", countryCode, "banks"] as const,
  },

  // Currencies
  currencies: {
    all: () => ["currencies"] as const,
    supported: () => ["currencies", "supported"] as const,
  },
} as const;

// Cache invalidation helpers
export const invalidateQueries = {
  // Invalidate all user-related queries
  user: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.user.all() });
  },

  // Invalidate all transaction queries
  transactions: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all() });
  },

  // Invalidate specific transaction
  transaction: (id: string) => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.transactions.detail(id),
    });
  },

  // Invalidate exchange rates
  exchangeRates: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.exchangeRates.all() });
  },

  // Invalidate KYC data
  kyc: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.kyc.all() });
  },

  // Invalidate all queries (use sparingly)
  all: () => {
    queryClient.invalidateQueries();
  },
};

// Cache management helpers
export const cacheUtils = {
  // Clear all cached data
  clearAll: () => {
    queryClient.clear();
  },

  // Remove specific query from cache
  removeQuery: (queryKey: any[]) => {
    queryClient.removeQueries({ queryKey });
  },

  // Set query data manually
  setQueryData: <T>(queryKey: any[], data: T) => {
    queryClient.setQueryData(queryKey, data);
  },

  // Get cached query data
  getQueryData: <T>(queryKey: any[]): T | undefined => {
    return queryClient.getQueryData<T>(queryKey);
  },

  // Prefetch query
  prefetchQuery: async (queryKey: any[], queryFn: () => Promise<any>) => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
    });
  },
};

// Error boundary helpers
export const errorHandlers = {
  // Global error handler for queries
  onQueryError: (error: ApiError) => {
    console.error("🔥 Query Error:", {
      message: error.message,
      status: error.status,
      code: error.code,
      timestamp: error.timestamp,
    });

    // Handle specific error types
    if (error.status === 401) {
      // Redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/signin";
      }
    }
  },

  // Global error handler for mutations
  onMutationError: (error: ApiError) => {
    console.error("🔥 Mutation Error:", {
      message: error.message,
      status: error.status,
      code: error.code,
      timestamp: error.timestamp,
    });
  },
};

// Performance monitoring
export const performanceMonitor = {
  // Log slow queries
  onQuerySuccess: (data: any, query: any) => {
    const duration = Date.now() - query.state.dataUpdatedAt;

    if (duration > 5000) {
      // Log queries taking more than 5 seconds
      console.warn("🐌 Slow Query Detected:", {
        queryKey: query.queryKey,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });
    }
  },

  // Monitor cache hit rates
  getCacheStats: () => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();

    const stats = {
      totalQueries: queries.length,
      staleQueries: queries.filter((q) => q.isStale()).length,
      fetchingQueries: queries.filter((q) => q.state.fetchStatus === "fetching")
        .length,
      errorQueries: queries.filter((q) => q.state.status === "error").length,
    };

    console.log("📊 Cache Stats:", stats);
    return stats;
  },
};

// Development helpers
if (process.env.NODE_ENV === "development") {
  // Enable query devtools logging
  queryClient.getQueryCache().subscribe((event) => {
    if (event.type === "added" || event.type === "updated") {
      console.log("🔍 Query Cache Event:", {
        type: event.type,
        queryKey: event.query.queryKey,
        status: event.query.state.status,
        timestamp: new Date().toISOString(),
      });
    }
  });
}

export default queryClient;
