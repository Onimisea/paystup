/**
 * Exchange Rate Query Hooks
 * React Query hooks for exchange rate and currency conversion API calls
 */

"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { request } from "../axios-config";
import { queryKeys } from "../query-client";
import { ExchangeRate, ExchangeRateRequest } from "../types";

// Get exchange rate for a currency pair
export const useExchangeRate = (
  from: string,
  to: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: queryKeys.exchangeRates.pair(from, to),
    queryFn: async (): Promise<ExchangeRate> => {
      const response = await request.get<ExchangeRate>(
        `/exchange-rates/${from}/${to}`
      );
      return response.data!;
    },
    enabled: enabled && !!from && !!to && from !== to,
    staleTime: 30 * 1000, // 30 seconds (exchange rates change frequently)
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
    refetchIntervalInBackground: true,
  });
};

// Get multiple exchange rates
export const useExchangeRates = (
  pairs: Array<{ from: string; to: string }>
) => {
  return useQuery({
    queryKey: queryKeys.exchangeRates.all(),
    queryFn: async (): Promise<ExchangeRate[]> => {
      const response = await request.post<ExchangeRate[]>(
        "/exchange-rates/batch",
        { pairs }
      );
      return response.data!;
    },
    enabled: pairs.length > 0,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

// Convert currency amount
export const useCurrencyConversion = (
  from: string,
  to: string,
  amount: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: queryKeys.exchangeRates.convert(from, to, amount),
    queryFn: async (): Promise<{
      from: string;
      to: string;
      amount: number;
      convertedAmount: number;
      exchangeRate: number;
      fee: number;
      totalAmount: number;
      timestamp: string;
    }> => {
      const response = await request.post<{
        from: string;
        to: string;
        amount: number;
        convertedAmount: number;
        exchangeRate: number;
        fee: number;
        totalAmount: number;
        timestamp: string;
      }>("/exchange-rates/convert", { from, to, amount });
      return response.data!;
    },
    enabled: enabled && !!from && !!to && amount > 0 && from !== to,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Real-time currency conversion with debouncing
export const useRealTimeConversion = () => {
  return useMutation({
    mutationFn: async (params: {
      from: string;
      to: string;
      amount: number;
    }): Promise<{
      from: string;
      to: string;
      amount: number;
      convertedAmount: number;
      exchangeRate: number;
      fee: number;
      totalAmount: number;
      timestamp: string;
    }> => {
      const response = await request.post<{
        from: string;
        to: string;
        amount: number;
        convertedAmount: number;
        exchangeRate: number;
        fee: number;
        totalAmount: number;
        timestamp: string;
      }>("/exchange-rates/convert", params);
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Currency conversion calculated:", {
        from: data.from,
        to: data.to,
        amount: data.amount,
        convertedAmount: data.convertedAmount,
        rate: data.exchangeRate,
        timestamp: new Date().toISOString(),
      });
    },
    onError: (error) => {
      console.error("❌ Currency conversion failed:", error);
    },
  });
};

// Get historical exchange rates
export const useHistoricalRates = (
  from: string,
  to: string,
  period: "1d" | "7d" | "30d" | "90d" | "1y" = "7d"
) => {
  return useQuery({
    queryKey: ["exchange-rates", "historical", from, to, period],
    queryFn: async (): Promise<
      Array<{
        date: string;
        rate: number;
        high: number;
        low: number;
        volume?: number;
      }>
    > => {
      const response = await request.get<
        Array<{
          date: string;
          rate: number;
          high: number;
          low: number;
          volume?: number;
        }>
      >(`/exchange-rates/historical/${from}/${to}`, {
        params: { period },
      });
      return response.data!;
    },
    enabled: !!from && !!to && from !== to,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Get supported currencies
export const useSupportedCurrencies = () => {
  return useQuery({
    queryKey: queryKeys.currencies.supported(),
    queryFn: async (): Promise<
      Array<{
        code: string;
        name: string;
        symbol: string;
        flag?: string;
        decimals: number;
        isActive: boolean;
        isCrypto: boolean;
        supportedCountries: string[];
      }>
    > => {
      const response = await request.get<
        Array<{
          code: string;
          name: string;
          symbol: string;
          flag?: string;
          decimals: number;
          isActive: boolean;
          isCrypto: boolean;
          supportedCountries: string[];
        }>
      >("/currencies/supported");
      return response.data!;
    },
    staleTime: 60 * 60 * 1000, // 1 hour (currencies don't change often)
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

// Get currency by country
export const useCurrencyByCountry = (countryCode: string) => {
  return useQuery({
    queryKey: ["currencies", "by-country", countryCode],
    queryFn: async (): Promise<{
      code: string;
      name: string;
      symbol: string;
      flag?: string;
      decimals: number;
    }> => {
      const response = await request.get<{
        code: string;
        name: string;
        symbol: string;
        flag?: string;
        decimals: number;
      }>(`/currencies/by-country/${countryCode}`);
      return response.data!;
    },
    enabled: !!countryCode,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

// Get exchange rate alerts/notifications
export const useExchangeRateAlerts = () => {
  return useQuery({
    queryKey: ["exchange-rates", "alerts"],
    queryFn: async (): Promise<
      Array<{
        id: string;
        from: string;
        to: string;
        targetRate: number;
        currentRate: number;
        condition: "above" | "below";
        isActive: boolean;
        createdAt: string;
      }>
    > => {
      const response = await request.get<
        Array<{
          id: string;
          from: string;
          to: string;
          targetRate: number;
          currentRate: number;
          condition: "above" | "below";
          isActive: boolean;
          createdAt: string;
        }>
      >("/exchange-rates/alerts");
      return response.data!;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create exchange rate alert
export const useCreateRateAlert = () => {
  return useMutation({
    mutationFn: async (alertData: {
      from: string;
      to: string;
      targetRate: number;
      condition: "above" | "below";
    }): Promise<{
      id: string;
      from: string;
      to: string;
      targetRate: number;
      condition: "above" | "below";
      isActive: boolean;
      createdAt: string;
    }> => {
      const response = await request.post<{
        id: string;
        from: string;
        to: string;
        targetRate: number;
        condition: "above" | "below";
        isActive: boolean;
        createdAt: string;
      }>("/exchange-rates/alerts", alertData);
      return response.data!;
    },
    onSuccess: (data) => {
      console.log("✅ Exchange rate alert created:", {
        id: data.id,
        pair: `${data.from}/${data.to}`,
        targetRate: data.targetRate,
        condition: data.condition,
        timestamp: new Date().toISOString(),
      });
    },
    onError: (error) => {
      console.error("❌ Exchange rate alert creation failed:", error);
    },
  });
};
