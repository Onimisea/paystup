"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function KYCSuccessClient() {
  const router = useRouter();

  // useEffect(() => {
  //   // Reset KYC store after successful completion
  //   const timer = setTimeout(() => {
  //     resetKYC();
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [resetKYC]);

  const handleContinue = () => {
    // Don't reset KYC - keep the completion status
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="md:bg-white rounded-lg p-8">
          <div className="w-16 h-16 bg-[#0BAB7C] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-semibold text-[#111827] mb-4">
            Verification Complete!
          </h1>

          <p className="text-[#4B5563] mb-8">
            Your identity has been successfully verified. You now have full
            access to all Paystup features.
          </p>

          <Button
            onClick={handleContinue}
            className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 focus:bg-[#0BAB7C]/90 text-white rounded-full py-3 font-medium cursor-pointer transition-colors"
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
