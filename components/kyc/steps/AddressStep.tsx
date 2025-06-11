"use client";

import { useKYCStore } from "@/lib/stores/kyc-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AddressStep() {
  const router = useRouter();
  const {
    address,
    updateAddress,
    validateAddress,
    errors,
    clearError,
    isLoading,
    setLoading,
    markAsCompleted,
  } = useKYCStore();

  const handleInputChange = (field: string, value: string) => {
    clearError(field);
    updateAddress({ [field]: value });
  };

  const handleSubmit = async () => {
    if (validateAddress()) {
      setLoading(true);

      try {
        // Get all KYC data from store
        const kycData = {
          personalDetails: useKYCStore.getState().personalDetails,
          verification: {
            selectedDocumentType:
              useKYCStore.getState().verification.selectedDocumentType,
            frontSide: {
              fileName: useKYCStore.getState().verification.frontSide.fileName,
              status: useKYCStore.getState().verification.frontSide.status,
            },
            backSide: {
              fileName: useKYCStore.getState().verification.backSide.fileName,
              status: useKYCStore.getState().verification.backSide.status,
            },
          },
          address: useKYCStore.getState().address,
          submittedAt: new Date().toISOString(),
        };

        // Console log all KYC data
        console.log("=== KYC SUBMISSION DATA ===");
        console.log("Complete KYC Data:", kycData);
        console.log("Personal Details:", kycData.personalDetails);
        console.log("Verification:", kycData.verification);
        console.log("Address:", kycData.address);
        console.log("Submitted At:", kycData.submittedAt);
        console.log("=== END KYC DATA ===");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mark KYC as completed and save all data to Zustand
        console.log("🔄 About to mark KYC as completed...");
        markAsCompleted();

        // Verify the completion was set
        const storeState = useKYCStore.getState();
        console.log("✅ KYC Marked as Completed:", {
          timestamp: new Date().toISOString(),
          status: "completed",
          storeIsCompleted: storeState.isCompleted,
          storeCompletedAt: storeState.completedAt,
        });

        console.log("💾 KYC Data Saved to Zustand Store:", {
          isCompleted: storeState.isCompleted,
          completedAt: storeState.completedAt,
          allDataPersisted: true,
          message:
            "All KYC data has been successfully saved to Zustand store and marked as completed",
        });

        // Check sessionStorage immediately after marking complete
        if (typeof window !== "undefined") {
          const storedData = sessionStorage.getItem("kyc-storage");
          console.log("🗄️ sessionStorage after completion:", storedData);
        }

        // Redirect to success page
        router.push("/kyc/success");
      } catch (error) {
        console.error("KYC submission failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-[#111827] mb-2">Address</h1>
        <p className="text-[#4B5563]">
          Provide your current residential address to complete your identity
          verification.
        </p>
      </div>

      <div className="md:bg-white rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-[#4B5563] font-medium">
              Country
            </Label>
            <Input
              id="country"
              value={address.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              placeholder="Nigeria"
              className={`${errors.country ? "border-red-500" : ""}`}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>

          {/* Residential Address */}
          <div className="space-y-2">
            <Label
              htmlFor="residentialAddress"
              className="text-[#4B5563] font-medium"
            >
              Residential Address
            </Label>
            <Input
              id="residentialAddress"
              value={address.residentialAddress}
              onChange={(e) =>
                handleInputChange("residentialAddress", e.target.value)
              }
              placeholder="No. 21 Williams street, Road 44."
              className={`${errors.residentialAddress ? "border-red-500" : ""}`}
            />
            {errors.residentialAddress && (
              <p className="text-red-500 text-sm">
                {errors.residentialAddress}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-[#4B5563] font-medium">
              City
            </Label>
            <Input
              id="city"
              value={address.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Wuse zone II"
              className={`${errors.city ? "border-red-500" : ""}`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state" className="text-[#4B5563] font-medium">
              State
            </Label>
            <Input
              id="state"
              value={address.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              placeholder="Abuja"
              className={`${errors.state ? "border-red-500" : ""}`}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          {/* Zip Code */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="zipCode" className="text-[#4B5563] font-medium">
              Zip code
            </Label>
            <Input
              id="zipCode"
              value={address.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              placeholder="11111"
              className={`${errors.zipCode ? "border-red-500" : ""}`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 focus:bg-[#0BAB7C]/90 text-white rounded-full py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
