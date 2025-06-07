"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ReceiveStep = "details" | "sharing" | "tracking" | "completed";

export interface PaymentRequestDetails {
  amount: string;
  currency: string;
  description: string;
  dueDate?: string;
  requestorName: string;
  requestorEmail: string;
}

export interface SharingOptions {
  qrCode: string;
  paymentLink: string;
  emailInvitations: string[];
  socialSharing: {
    whatsapp: boolean;
    telegram: boolean;
    twitter: boolean;
  };
}

export interface PaymentEntry {
  id: string;
  amount: number;
  currency: string;
  paidBy: {
    name: string;
    email?: string;
    country: string;
  };
  paidAt: string;
  reference: string;
}

export interface PaymentRequestStatus {
  id: string;
  status: 'pending' | 'partially_paid' | 'completed' | 'expired' | 'cancelled';
  amountRequested: number;
  amountReceived: number;
  currency: string;
  description: string;
  createdAt: string;
  expiresAt?: string;
  payments: PaymentEntry[];
  qrCode?: string;
  paymentLink: string;
}

export interface ReceiveState {
  currentStep: ReceiveStep;
  requestDetails: PaymentRequestDetails;
  sharingOptions: SharingOptions;
  activeRequests: PaymentRequestStatus[];
  currentRequestId: string;
  isLoading: boolean;
  errors: Record<string, string>;

  // Actions
  setCurrentStep: (step: ReceiveStep) => void;
  updateRequestDetails: (details: Partial<PaymentRequestDetails>) => void;
  updateSharingOptions: (options: Partial<SharingOptions>) => void;
  addPaymentRequest: (request: PaymentRequestStatus) => void;
  updatePaymentRequest: (id: string, updates: Partial<PaymentRequestStatus>) => void;
  setCurrentRequestId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearErrors: () => void;
  resetReceive: () => void;

  // Validation
  validateRequestDetails: () => boolean;
  validateSharingOptions: () => boolean;
}

const initialRequestDetails: PaymentRequestDetails = {
  amount: "",
  currency: "USD",
  description: "",
  dueDate: "",
  requestorName: "",
  requestorEmail: "",
};

const initialSharingOptions: SharingOptions = {
  qrCode: "",
  paymentLink: "",
  emailInvitations: [],
  socialSharing: {
    whatsapp: false,
    telegram: false,
    twitter: false,
  },
};

export const useReceiveStore = create<ReceiveState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: "details",
      requestDetails: initialRequestDetails,
      sharingOptions: initialSharingOptions,
      activeRequests: [],
      currentRequestId: "",
      isLoading: false,
      errors: {},

      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),

      updateRequestDetails: (detailsUpdate) =>
        set((state) => ({
          requestDetails: { ...state.requestDetails, ...detailsUpdate },
        })),

      updateSharingOptions: (optionsUpdate) =>
        set((state) => ({
          sharingOptions: { ...state.sharingOptions, ...optionsUpdate },
        })),

      addPaymentRequest: (request) =>
        set((state) => ({
          activeRequests: [request, ...state.activeRequests],
        })),

      updatePaymentRequest: (id, updates) =>
        set((state) => ({
          activeRequests: state.activeRequests.map((request) =>
            request.id === id ? { ...request, ...updates } : request
          ),
        })),

      setCurrentRequestId: (id) => set({ currentRequestId: id }),

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

      resetReceive: () =>
        set({
          currentStep: "details",
          requestDetails: initialRequestDetails,
          sharingOptions: initialSharingOptions,
          currentRequestId: "",
          isLoading: false,
          errors: {},
        }),

      // Validation methods
      validateRequestDetails: () => {
        const { requestDetails, setError, clearErrors } = get();
        clearErrors();

        let isValid = true;

        if (!requestDetails.amount || parseFloat(requestDetails.amount) <= 0) {
          setError("amount", "Please enter a valid amount");
          isValid = false;
        }

        if (!requestDetails.currency) {
          setError("currency", "Please select a currency");
          isValid = false;
        }

        if (!requestDetails.description.trim()) {
          setError("description", "Please enter a description");
          isValid = false;
        }

        if (requestDetails.description.length > 200) {
          setError("description", "Description must be less than 200 characters");
          isValid = false;
        }

        return isValid;
      },

      validateSharingOptions: () => {
        const { sharingOptions, setError, clearErrors } = get();
        clearErrors();

        // For now, sharing options are always valid
        // Can add validation for email format, etc. later
        return true;
      },
    }),
    {
      name: "receive-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        requestDetails: state.requestDetails,
        sharingOptions: state.sharingOptions,
        currentRequestId: state.currentRequestId,
      }),
    }
  )
);
