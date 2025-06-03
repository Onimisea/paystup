/**
 * API Client Main Export
 * Central export point for all API-related functionality
 */

// Core API client
export { default as apiClient, request, uploadFile } from "./axios-config";

// Query client and configuration
export {
  default as queryClient,
  queryKeys,
  invalidateQueries,
  cacheUtils,
  errorHandlers,
  performanceMonitor,
} from "./query-client";

// React Query Provider
export { QueryProvider } from "./query-provider";

// Types
export type * from "./types";

// Authentication hooks
export {
  useLogin,
  useRegister,
  useLogout,
  useUserProfile,
  useUpdateProfile,
  useUploadAvatar,
  useForgotPassword,
  useResetPassword,
  useRefreshToken,
} from "./hooks/auth-hooks";

// Transaction hooks
export {
  useTransactions,
  useInfiniteTransactions,
  useTransaction,
  useTransactionSummary,
  useCreateTransaction,
  useCancelTransaction,
  useRetryTransaction,
  useTransactionReceipt,
  useExportTransactions,
  useTransactionUpdates,
} from "./hooks/transaction-hooks";

// Exchange rate hooks
export {
  useExchangeRate,
  useExchangeRates,
  useCurrencyConversion,
  useRealTimeConversion,
  useHistoricalRates,
  useSupportedCurrencies,
  useCurrencyByCountry,
  useExchangeRateAlerts,
  useCreateRateAlert,
} from "./hooks/exchange-rate-hooks";

// Utility functions for common API operations
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const { isAuthenticated, checkAuthValidity } =
      require("@/lib/stores/auth-store").useAuthStore.getState();
    return isAuthenticated && checkAuthValidity();
  },

  // Get current auth token
  getAuthToken: () => {
    const { authToken } =
      require("@/lib/stores/auth-store").useAuthStore.getState();
    return authToken;
  },

  // Format currency amount
  formatCurrency: (
    amount: number,
    currency: string,
    locale: string = "en-US"
  ) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  },

  // Format transaction status
  formatTransactionStatus: (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
      failed: "Failed",
      cancelled: "Cancelled",
    };
    return statusMap[status] || status;
  },

  // Get status color for UI
  getStatusColor: (status: string) => {
    const colorMap: Record<string, string> = {
      pending: "#F59E0B", // Yellow
      processing: "#3B82F6", // Blue
      completed: "#10B981", // Green
      failed: "#EF4444", // Red
      cancelled: "#6B7280", // Gray
    };
    return colorMap[status] || "#6B7280";
  },

  // Validate email format
  isValidEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Generate transaction reference
  generateTransactionRef: () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TXN-${timestamp}-${random}`.toUpperCase();
  },

  // Calculate transaction fee
  calculateFee: (
    amount: number,
    feePercentage: number = 0.025,
    minFee: number = 1,
    maxFee: number = 50
  ) => {
    const calculatedFee = amount * feePercentage;
    return Math.min(Math.max(calculatedFee, minFee), maxFee);
  },

  // Debounce function for search/input
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Format date for API
  formatDateForAPI: (date: Date) => {
    return date.toISOString().split("T")[0];
  },

  // Parse API date
  parseAPIDate: (dateString: string) => {
    return new Date(dateString);
  },

  // Check if amount is valid
  isValidAmount: (
    amount: number,
    minAmount: number = 0.01,
    maxAmount: number = 1000000
  ) => {
    return amount >= minAmount && amount <= maxAmount && !isNaN(amount);
  },

  // Format phone number
  formatPhoneNumber: (phone: string, countryCode: string = "+1") => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith(countryCode.replace("+", ""))) {
      return `+${cleaned}`;
    }
    return `${countryCode}${cleaned}`;
  },

  // Mask sensitive data for logging
  maskSensitiveData: (data: any) => {
    const sensitiveFields = [
      "password",
      "token",
      "authToken",
      "ssn",
      "accountNumber",
    ];
    const masked = { ...data };

    sensitiveFields.forEach((field) => {
      if (masked[field]) {
        masked[field] = "***MASKED***";
      }
    });

    return masked;
  },
};

// Error handling utilities
export const errorUtils = {
  // Check if error is network related
  isNetworkError: (error: any) => {
    return !error.status || error.code === "NETWORK_ERROR";
  },

  // Check if error is authentication related
  isAuthError: (error: any) => {
    return error.status === 401 || error.status === 403;
  },

  // Check if error is validation related
  isValidationError: (error: any) => {
    return error.status === 400 || error.status === 422;
  },

  // Get user-friendly error message
  getUserFriendlyMessage: (error: any) => {
    if (errorUtils.isNetworkError(error)) {
      return "Network connection error. Please check your internet connection and try again.";
    }

    if (errorUtils.isAuthError(error)) {
      return "Authentication failed. Please sign in again.";
    }

    if (errorUtils.isValidationError(error)) {
      return error.message || "Please check your input and try again.";
    }

    if (error.status >= 500) {
      return "Server error. Please try again later.";
    }

    return error.message || "An unexpected error occurred.";
  },
};

// Performance monitoring utilities
export const performanceUtils = {
  // Measure API call performance
  measureApiCall: async <T>(
    apiCall: () => Promise<T>,
    operationName: string
  ): Promise<T> => {
    const startTime = performance.now();

    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(
        `⚡ API Performance - ${operationName}: ${duration.toFixed(2)}ms`
      );

      if (duration > 5000) {
        console.warn(
          `🐌 Slow API call detected - ${operationName}: ${duration.toFixed(
            2
          )}ms`
        );
      }

      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.error(
        `❌ API Error - ${operationName}: ${duration.toFixed(2)}ms`,
        error
      );
      throw error;
    }
  },

  // Log cache hit/miss statistics
  logCacheStats: () => {
    const { queryClient: client } = require("./query-client");
    const cache = client.getQueryCache();
    const queries = cache.getAll();

    const stats = {
      totalQueries: queries.length,
      staleQueries: queries.filter((q: any) => q.isStale()).length,
      fetchingQueries: queries.filter(
        (q: any) => q.state.fetchStatus === "fetching"
      ).length,
      errorQueries: queries.filter((q: any) => q.state.status === "error")
        .length,
    };

    console.log("📊 Cache Stats:", stats);
    return stats;
  },
};
