/**
 * Transaction Query Hooks
 * React Query hooks for transaction-related API calls
 */

"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { request } from "../axios-config";
import { queryKeys, invalidateQueries } from "../query-client";
import {
  Transaction,
  CreateTransactionRequest,
  QueryParams,
  ApiResponse,
} from "../types";

// Get transactions list with pagination and filtering
export const useTransactions = (params?: QueryParams) => {
  return useQuery({
    queryKey: queryKeys.transactions.list(params),
    queryFn: async (): Promise<{
      transactions: Transaction[];
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }> => {
      const response = await request.get<{
        transactions: Transaction[];
        meta: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      }>("/transactions", { params });
      return response.data!;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get transactions with infinite scroll
export const useInfiniteTransactions = (params?: Omit<QueryParams, "page">) => {
  return useInfiniteQuery({
    queryKey: queryKeys.transactions.list(params),
    queryFn: async ({
      pageParam = 1,
    }): Promise<{
      transactions: Transaction[];
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }> => {
      const response = await request.get<{
        transactions: Transaction[];
        meta: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      }>("/transactions", {
        params: { ...params, page: pageParam },
      });
      return response.data!;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Get single transaction details
export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: async (): Promise<Transaction> => {
      const response = await request.get<Transaction>(`/transactions/${id}`);
      return response.data!;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get transaction summary/statistics
export const useTransactionSummary = () => {
  return useQuery({
    queryKey: queryKeys.transactions.summary(),
    queryFn: async (): Promise<{
      totalSent: number;
      totalReceived: number;
      totalTransactions: number;
      pendingTransactions: number;
      thisMonthTotal: number;
      lastMonthTotal: number;
    }> => {
      const response = await request.get<{
        totalSent: number;
        totalReceived: number;
        totalTransactions: number;
        pendingTransactions: number;
        thisMonthTotal: number;
        lastMonthTotal: number;
      }>("/transactions/summary");
      return response.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create new transaction
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      transactionData: CreateTransactionRequest
    ): Promise<Transaction> => {
      const response = await request.post<Transaction>(
        "/transactions",
        transactionData
      );
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Transaction created successfully:", {
        id: data.id,
        type: data.type,
        amount: data.amount,
        currency: data.currency,
        timestamp: new Date().toISOString(),
      });

      // Invalidate transactions list
      invalidateQueries.transactions();

      // Add new transaction to cache
      queryClient.setQueryData(queryKeys.transactions.detail(data.id), data);
    },
    onError: (error) => {
      console.error("❌ Transaction creation failed:", error);
    },
  });
};

// Cancel transaction
export const useCancelTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: string): Promise<Transaction> => {
      const response = await request.patch<Transaction>(
        `/transactions/${transactionId}/cancel`
      );
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Transaction cancelled successfully:", {
        id: data.id,
        status: data.status,
        timestamp: new Date().toISOString(),
      });

      // Update cached transaction
      queryClient.setQueryData(queryKeys.transactions.detail(data.id), data);

      // Invalidate transactions list
      invalidateQueries.transactions();
    },
    onError: (error) => {
      console.error("❌ Transaction cancellation failed:", error);
    },
  });
};

// Retry failed transaction
export const useRetryTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: string): Promise<Transaction> => {
      const response = await request.post<Transaction>(
        `/transactions/${transactionId}/retry`
      );
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Transaction retry initiated:", {
        id: data.id,
        status: data.status,
        timestamp: new Date().toISOString(),
      });

      // Update cached transaction
      queryClient.setQueryData(queryKeys.transactions.detail(data.id), data);

      // Invalidate transactions list
      invalidateQueries.transactions();
    },
    onError: (error) => {
      console.error("❌ Transaction retry failed:", error);
    },
  });
};

// Get transaction receipt/proof
export const useTransactionReceipt = () => {
  return useMutation({
    mutationFn: async (
      transactionId: string
    ): Promise<{ receiptUrl: string }> => {
      const response = await request.get<{ receiptUrl: string }>(
        `/transactions/${transactionId}/receipt`
      );
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Transaction receipt generated");

      // Open receipt in new tab
      if (typeof window !== "undefined") {
        window.open(data.receiptUrl, "_blank");
      }
    },
    onError: (error) => {
      console.error("❌ Receipt generation failed:", error);
    },
  });
};

// Export transaction data
export const useExportTransactions = () => {
  return useMutation({
    mutationFn: async (params: {
      format: "csv" | "pdf" | "excel";
      dateFrom?: string;
      dateTo?: string;
      status?: string[];
      type?: string[];
    }): Promise<{ downloadUrl: string }> => {
      const response = await request.post<{ downloadUrl: string }>(
        "/transactions/export",
        params
      );
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Transaction export generated");

      // Trigger download
      if (typeof window !== "undefined") {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = `transactions-${
          new Date().toISOString().split("T")[0]
        }.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    onError: (error) => {
      console.error("❌ Transaction export failed:", error);
    },
  });
};

// Real-time transaction updates (WebSocket simulation)
export const useTransactionUpdates = (transactionId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["transaction-updates", transactionId],
    queryFn: async (): Promise<Transaction> => {
      const response = await request.get<Transaction>(
        `/transactions/${transactionId}/status`
      );
      return response.data!;
    },
    enabled: !!transactionId,
    refetchInterval: (query) => {
      // Stop polling if transaction is completed or failed
      const data = query.state.data as Transaction | undefined;
      if (
        data?.status === "completed" ||
        data?.status === "failed" ||
        data?.status === "cancelled"
      ) {
        return false;
      }
      // Poll every 5 seconds for pending/processing transactions
      return 5000;
    },
  });
};
