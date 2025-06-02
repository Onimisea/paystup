import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type KYCStep = "personal-details" | "verification" | "address";
export type DocumentType = "passport" | "drivers-license" | "national-id";
export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  phoneNumber: {
    countryCode: string;
    number: string;
  };
}

export interface DocumentUpload {
  file: File | null;
  preview: string | null;
  status: UploadStatus;
  fileName: string | null;
  error: string | null;
}

export interface VerificationData {
  selectedDocumentType: DocumentType | null;
  frontSide: DocumentUpload;
  backSide: DocumentUpload;
}

export interface AddressData {
  country: string;
  residentialAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface KYCState {
  // Current step
  currentStep: KYCStep;

  // Completion status
  isCompleted: boolean;
  completedAt: string | null;

  // Form data
  personalDetails: PersonalDetails;
  verification: VerificationData;
  address: AddressData;

  // UI state
  isLoading: boolean;
  errors: Record<string, string>;

  // Actions
  setCurrentStep: (step: KYCStep) => void;
  updatePersonalDetails: (details: Partial<PersonalDetails>) => void;
  updateVerification: (verification: Partial<VerificationData>) => void;
  updateAddress: (address: Partial<AddressData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;

  // Document upload actions
  setDocumentType: (type: DocumentType | null) => void;
  uploadDocument: (side: "front" | "back", file: File) => Promise<void>;
  removeDocument: (side: "front" | "back") => void;

  // Form validation
  validatePersonalDetails: () => boolean;
  validateVerification: () => boolean;
  validateAddress: () => boolean;

  // Completion
  markAsCompleted: () => void;

  // Reset
  resetKYC: () => void;
}

const initialPersonalDetails: PersonalDetails = {
  firstName: "",
  lastName: "",
  dateOfBirth: {
    day: "",
    month: "",
    year: "",
  },
  phoneNumber: {
    countryCode: "+234",
    number: "",
  },
};

const initialDocumentUpload: DocumentUpload = {
  file: null,
  preview: null,
  status: "idle",
  fileName: null,
  error: null,
};

const initialVerification: VerificationData = {
  selectedDocumentType: null,
  frontSide: { ...initialDocumentUpload },
  backSide: { ...initialDocumentUpload },
};

const initialAddress: AddressData = {
  country: "",
  residentialAddress: "",
  city: "",
  state: "",
  zipCode: "",
};

export const useKYCStore = create<KYCState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: "personal-details",
      isCompleted: false,
      completedAt: null,
      personalDetails: initialPersonalDetails,
      verification: initialVerification,
      address: initialAddress,
      isLoading: false,
      errors: {},

      // Step navigation
      setCurrentStep: (step) => set({ currentStep: step }),

      // Update form data
      updatePersonalDetails: (details) =>
        set((state) => ({
          personalDetails: { ...state.personalDetails, ...details },
        })),

      updateVerification: (verification) =>
        set((state) => ({
          verification: { ...state.verification, ...verification },
        })),

      updateAddress: (address) =>
        set((state) => ({
          address: { ...state.address, ...address },
        })),

      // UI state
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

      clearAllErrors: () => set({ errors: {} }),

      // Document upload actions
      setDocumentType: (type) =>
        set((state) => ({
          verification: {
            ...state.verification,
            selectedDocumentType: type,
            frontSide: { ...initialDocumentUpload },
            backSide: { ...initialDocumentUpload },
          },
        })),

      uploadDocument: async (side, file) => {
        // Update upload status to uploading
        set((state) => ({
          verification: {
            ...state.verification,
            [side === "front" ? "frontSide" : "backSide"]: {
              ...state.verification[
                side === "front" ? "frontSide" : "backSide"
              ],
              status: "uploading",
              file,
              fileName: file.name,
              error: null,
            },
          },
        }));

        try {
          // Create preview
          const preview = URL.createObjectURL(file);

          // Simulate upload delay
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Simulate random upload failure for demo
          if (Math.random() < 0.2) {
            throw new Error("Upload failed. Please try again.");
          }

          // Update success status
          set((state) => ({
            verification: {
              ...state.verification,
              [side === "front" ? "frontSide" : "backSide"]: {
                ...state.verification[
                  side === "front" ? "frontSide" : "backSide"
                ],
                status: "success",
                preview,
                error: null,
              },
            },
          }));
        } catch (error) {
          // Update error status
          set((state) => ({
            verification: {
              ...state.verification,
              [side === "front" ? "frontSide" : "backSide"]: {
                ...state.verification[
                  side === "front" ? "frontSide" : "backSide"
                ],
                status: "error",
                error: error instanceof Error ? error.message : "Upload failed",
              },
            },
          }));
        }
      },

      removeDocument: (side) =>
        set((state) => ({
          verification: {
            ...state.verification,
            [side === "front" ? "frontSide" : "backSide"]: {
              ...initialDocumentUpload,
            },
          },
        })),

      // Validation
      validatePersonalDetails: () => {
        const { personalDetails, setError, clearAllErrors } = get();
        clearAllErrors();

        let isValid = true;

        if (!personalDetails.firstName.trim()) {
          setError("firstName", "First name is required");
          isValid = false;
        }

        if (!personalDetails.lastName.trim()) {
          setError("lastName", "Last name is required");
          isValid = false;
        }

        if (
          !personalDetails.dateOfBirth.day ||
          !personalDetails.dateOfBirth.month ||
          !personalDetails.dateOfBirth.year
        ) {
          setError("dateOfBirth", "Date of birth is required");
          isValid = false;
        }

        if (!personalDetails.phoneNumber.number.trim()) {
          setError("phoneNumber", "Phone number is required");
          isValid = false;
        }

        return isValid;
      },

      validateVerification: () => {
        const { verification, setError, clearAllErrors } = get();
        clearAllErrors();

        let isValid = true;

        if (!verification.selectedDocumentType) {
          setError("documentType", "Please select a document type");
          isValid = false;
        }

        if (verification.frontSide.status !== "success") {
          setError(
            "frontSide",
            "Please upload the front side of your document"
          );
          isValid = false;
        }

        if (verification.backSide.status !== "success") {
          setError("backSide", "Please upload the back side of your document");
          isValid = false;
        }

        return isValid;
      },

      validateAddress: () => {
        const { address, setError, clearAllErrors } = get();
        clearAllErrors();

        let isValid = true;

        if (!address.country.trim()) {
          setError("country", "Country is required");
          isValid = false;
        }

        if (!address.residentialAddress.trim()) {
          setError("residentialAddress", "Residential address is required");
          isValid = false;
        }

        if (!address.city.trim()) {
          setError("city", "City is required");
          isValid = false;
        }

        if (!address.state.trim()) {
          setError("state", "State is required");
          isValid = false;
        }

        if (!address.zipCode.trim()) {
          setError("zipCode", "Zip code is required");
          isValid = false;
        }

        return isValid;
      },

      // Completion
      markAsCompleted: () => {
        console.log("🔄 markAsCompleted called in store");
        const completedAt = new Date().toISOString();
        const newState = {
          isCompleted: true,
          completedAt,
        };
        console.log("📝 Setting new state:", newState);

        set(newState);

        // Verify the state was set correctly
        const currentState = get();
        console.log("✅ State set, current store state:", {
          isCompleted: currentState.isCompleted,
          completedAt: currentState.completedAt,
        });

        // Force persistence by triggering a small state change
        setTimeout(() => {
          const state = get();
          if (state.isCompleted) {
            console.log("🔄 Forcing persistence check...");
            set({ isCompleted: true, completedAt }); // Re-trigger persistence
          }
        }, 100);
      },

      // Reset
      resetKYC: () =>
        set({
          currentStep: "personal-details",
          isCompleted: false,
          completedAt: null,
          personalDetails: initialPersonalDetails,
          verification: initialVerification,
          address: initialAddress,
          isLoading: false,
          errors: {},
        }),
    }),
    {
      name: "kyc-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage as requested
      partialize: (state) => {
        console.log("🔄 Persisting state:", {
          isCompleted: state.isCompleted,
          completedAt: state.completedAt,
          currentStep: state.currentStep,
        });

        try {
          return {
            currentStep: state.currentStep,
            isCompleted: state.isCompleted,
            completedAt: state.completedAt,
            personalDetails: state.personalDetails,
            verification: {
              selectedDocumentType: state.verification.selectedDocumentType,
              // Don't persist file objects, only metadata
              frontSide: {
                status: state.verification.frontSide.status,
                fileName: state.verification.frontSide.fileName,
                preview: state.verification.frontSide.preview,
                error: state.verification.frontSide.error,
                file: null,
              },
              backSide: {
                status: state.verification.backSide.status,
                fileName: state.verification.backSide.fileName,
                preview: state.verification.backSide.preview,
                error: state.verification.backSide.error,
                file: null,
              },
            },
            address: state.address,
          };
        } catch (error) {
          console.error("❌ Error partializing state:", error);
          return {
            currentStep: state.currentStep,
            isCompleted: state.isCompleted,
            completedAt: state.completedAt,
          };
        }
      },
      onRehydrateStorage: () => (state) => {
        console.log("🔄 Rehydrating from storage:", state);
        if (state) {
          console.log("✅ Successfully rehydrated KYC state:", {
            isCompleted: state.isCompleted,
            completedAt: state.completedAt,
            currentStep: state.currentStep,
          });
        } else {
          console.log("⚠️ No stored state found, using initial state");
        }
      },
      migrate: (persistedState: any, version: number) => {
        console.log("🔄 Migrating KYC store from version:", version);

        // If no version or version 0, migrate to version 1
        if (version === 0 || !version) {
          console.log("📦 Migrating to version 1...");

          // Ensure all required fields exist
          const migratedState = {
            ...persistedState,
            isCompleted: persistedState.isCompleted || false,
            completedAt: persistedState.completedAt || null,
            currentStep: persistedState.currentStep || "personal-details",
            personalDetails: persistedState.personalDetails || {
              firstName: "",
              lastName: "",
              dateOfBirth: { day: "", month: "", year: "" },
              phoneNumber: { countryCode: "+234", number: "" },
            },
            verification: persistedState.verification || {
              selectedDocumentType: null,
              frontSide: {
                status: "idle",
                fileName: "",
                preview: "",
                error: null,
                file: null,
              },
              backSide: {
                status: "idle",
                fileName: "",
                preview: "",
                error: null,
                file: null,
              },
            },
            address: persistedState.address || {
              country: "",
              residentialAddress: "",
              city: "",
              state: "",
              zipCode: "",
            },
          };

          console.log("✅ Migration to version 1 complete");
          return migratedState;
        }

        // For future versions, add migration logic here
        return persistedState;
      },
      skipHydration: false,
      version: 1, // Add version for future migrations
    }
  )
);
