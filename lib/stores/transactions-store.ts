import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TransactionType = "send" | "receive" | "conversion" | "card_transaction" | "cash_withdrawal";
export type TransactionStatus = "successful" | "pending" | "unsuccessful";
export type Currency = "NGN" | "INR" | "USD" | "EUR" | "GBP";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  type: TransactionType;
  recipient?: string;
  reference?: string;
  icon: string;
  iconColor: string;
}

export interface TransactionFilters {
  dateRange: {
    from: string | null;
    to: string | null;
  };
  status: TransactionStatus[];
  type: TransactionType[];
  currency: Currency[];
  searchQuery: string;
}

export interface TransactionsState {
  // State
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filters: TransactionFilters;
  isLoading: boolean;

  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateFilters: (filters: Partial<TransactionFilters>) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  setLoading: (loading: boolean) => void;
}

const initialFilters: TransactionFilters = {
  dateRange: { from: null, to: null },
  status: [],
  type: [],
  currency: [],
  searchQuery: "",
};

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date().toISOString(),
    description: "Money sent to Vivian",
    amount: 12000,
    currency: "NGN",
    status: "pending",
    type: "send",
    recipient: "Vivian",
    icon: "V",
    iconColor: "#F59E0B",
  },
  {
    id: "2",
    date: new Date().toISOString(),
    description: "Money sent to Samuel",
    amount: 12000,
    currency: "NGN",
    status: "successful",
    type: "send",
    recipient: "Samuel",
    icon: "S",
    iconColor: "#10B981",
  },
  {
    id: "3",
    date: new Date().toISOString(),
    description: "Converted NGN to INR",
    amount: 12000,
    currency: "NGN",
    status: "successful",
    type: "conversion",
    icon: "↔",
    iconColor: "#10B981",
  },
  {
    id: "4",
    date: new Date().toISOString(),
    description: "Money sent to Matthew",
    amount: 13000,
    currency: "NGN",
    status: "unsuccessful",
    type: "send",
    recipient: "Matthew",
    icon: "M",
    iconColor: "#EF4444",
  },
  {
    id: "5",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: "Money sent to Samuel",
    amount: 12000,
    currency: "NGN",
    status: "successful",
    type: "send",
    recipient: "Samuel",
    icon: "S",
    iconColor: "#10B981",
  },
  {
    id: "6",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: "Money sent to Matthew",
    amount: 13000,
    currency: "NGN",
    status: "unsuccessful",
    type: "send",
    recipient: "Matthew",
    icon: "M",
    iconColor: "#EF4444",
  },
  {
    id: "7",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: "Converted NGN to INR",
    amount: 12000,
    currency: "NGN",
    status: "successful",
    type: "conversion",
    icon: "↔",
    iconColor: "#10B981",
  },
  {
    id: "8",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: "Money sent to Vivian",
    amount: 12000,
    currency: "NGN",
    status: "pending",
    type: "send",
    recipient: "Vivian",
    icon: "V",
    iconColor: "#F59E0B",
  },
];

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      filteredTransactions: mockTransactions,
      filters: initialFilters,
      isLoading: false,

      setTransactions: (transactions: Transaction[]) => {
        set({ transactions, filteredTransactions: transactions });
      },

      addTransaction: (transaction: Transaction) => {
        const currentTransactions = get().transactions;
        const newTransactions = [transaction, ...currentTransactions];
        set({ transactions: newTransactions });
        get().applyFilters();
      },

      updateFilters: (newFilters: Partial<TransactionFilters>) => {
        const currentFilters = get().filters;
        const updatedFilters = { ...currentFilters, ...newFilters };
        set({ filters: updatedFilters });
      },

      clearFilters: () => {
        set({ filters: initialFilters });
        get().applyFilters();
      },

      applyFilters: () => {
        const { transactions, filters } = get();
        let filtered = [...transactions];

        // Apply search filter
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (transaction) =>
              transaction.description.toLowerCase().includes(query) ||
              transaction.recipient?.toLowerCase().includes(query)
          );
        }

        // Apply status filter
        if (filters.status.length > 0) {
          filtered = filtered.filter((transaction) =>
            filters.status.includes(transaction.status)
          );
        }

        // Apply type filter
        if (filters.type.length > 0) {
          filtered = filtered.filter((transaction) =>
            filters.type.includes(transaction.type)
          );
        }

        // Apply currency filter
        if (filters.currency.length > 0) {
          filtered = filtered.filter((transaction) =>
            filters.currency.includes(transaction.currency)
          );
        }

        // Apply date range filter
        if (filters.dateRange.from || filters.dateRange.to) {
          filtered = filtered.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
            const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;

            if (fromDate && transactionDate < fromDate) return false;
            if (toDate && transactionDate > toDate) return false;
            return true;
          });
        }

        set({ filteredTransactions: filtered });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "transactions-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        transactions: state.transactions,
        filters: state.filters,
      }),
    }
  )
);
