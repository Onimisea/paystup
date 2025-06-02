"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SendStep = "recipient" | "amount" | "review" | "payment";

export interface RecipientDetails {
  accountName: string;
  accountNumber: string;
  bank: string;
  country: string;
  countryCode: string;
}

export interface AmountDetails {
  sendAmount: string;
  sendCurrency: string;
  receiveAmount: string;
  receiveCurrency: string;
  exchangeRate: number;
  fees: number;
  totalAmount: number;
}

export interface SendState {
  currentStep: SendStep;
  recipient: RecipientDetails;
  amount: AmountDetails;
  password: string;
  isLoading: boolean;
  errors: Record<string, string>;

  // Actions
  setCurrentStep: (step: SendStep) => void;
  updateRecipient: (recipient: Partial<RecipientDetails>) => void;
  updateAmount: (amount: Partial<AmountDetails>) => void;
  setPassword: (password: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearErrors: () => void;
  resetSend: () => void;

  // Validation
  validateRecipient: () => boolean;
  validateAmount: () => boolean;
  validatePassword: () => boolean;
}

const initialRecipient: RecipientDetails = {
  accountName: "",
  accountNumber: "",
  bank: "",
  country: "",
  countryCode: "",
};

const initialAmount: AmountDetails = {
  sendAmount: "",
  sendCurrency: "NGN",
  receiveAmount: "",
  receiveCurrency: "INR",
  exchangeRate: 0,
  fees: 0,
  totalAmount: 0,
};

export const useSendStore = create<SendState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: "recipient",
      recipient: initialRecipient,
      amount: initialAmount,
      password: "",
      isLoading: false,
      errors: {},

      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),

      updateRecipient: (recipientUpdate) =>
        set((state) => ({
          recipient: { ...state.recipient, ...recipientUpdate },
        })),

      updateAmount: (amountUpdate) =>
        set((state) => ({
          amount: { ...state.amount, ...amountUpdate },
        })),

      setPassword: (password) => set({ password }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (field, error) =>
        set((state) => ({
          errors: { ...state.errors, [field]: error },
        })),

      clearError: (field) =>
        set((state) => {
          const newErrors = { ...state.errors };
          delete newErrors[field];
          return { errors: newErrors };
        }),

      clearErrors: () => set({ errors: {} }),

      resetSend: () =>
        set({
          currentStep: "recipient",
          recipient: initialRecipient,
          amount: initialAmount,
          password: "",
          isLoading: false,
          errors: {},
        }),

      // Validation
      validateRecipient: () => {
        const { recipient, setError, clearErrors } = get();
        clearErrors();

        let isValid = true;

        if (!recipient.accountName.trim()) {
          setError("accountName", "Account name is required");
          isValid = false;
        }

        if (!recipient.accountNumber.trim()) {
          setError("accountNumber", "Account number is required");
          isValid = false;
        }

        if (!recipient.bank.trim()) {
          setError("bank", "Bank is required");
          isValid = false;
        }

        if (!recipient.country.trim() || !recipient.countryCode.trim()) {
          setError("country", "Country is required");
          isValid = false;
        }

        return isValid;
      },

      validateAmount: () => {
        const { amount, setError, clearErrors } = get();
        clearErrors();

        let isValid = true;

        if (!amount.sendAmount || parseFloat(amount.sendAmount) <= 0) {
          setError("sendAmount", "Please enter a valid amount");
          isValid = false;
        }

        if (!amount.sendCurrency) {
          setError("sendCurrency", "Please select a currency");
          isValid = false;
        }

        if (!amount.receiveCurrency) {
          setError("receiveCurrency", "Please select a currency");
          isValid = false;
        }

        return isValid;
      },

      validatePassword: () => {
        const { password, setError, clearErrors } = get();
        clearErrors();

        if (!password.trim()) {
          setError("password", "Password is required");
          return false;
        }

        return true;
      },
    }),
    {
      name: "send-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        recipient: state.recipient,
        amount: state.amount,
      }),
    }
  )
);
