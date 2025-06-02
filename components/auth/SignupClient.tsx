"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Mail } from "lucide-react";
import OAuthButtons from "@/components/auth/OAuthButtons";
import MultiStepSignup from "@/components/auth/MultiStepSignup";
import ProgressHeader from "@/components/auth/ProgressHeader";
import { useRouter } from "@/i18n/navigation";

type SignupFlow = "initial" | "email" | "oauth";
type SignupStep = "email" | "verification" | "password" | "country";

export default function SignupClient() {
  const t = useTranslations("Auth.signup");
  const router = useRouter();
  const [currentFlow, setCurrentFlow] = useState<SignupFlow>("initial");
  const [currentStep, setCurrentStep] = useState<SignupStep>("email");

  const handleOAuthSuccess = () => {
    console.log("OAuth Signup Flow Completed Successfully:", {
      timestamp: new Date().toISOString(),
      redirectTo: "/dashboard",
      flow: "oauth",
    });

    // Redirect to dashboard after successful OAuth signup
    router.push("/dashboard");
  };

  const handleOAuthError = (error: string) => {
    console.error("OAuth Signup Flow Error:", {
      error,
      timestamp: new Date().toISOString(),
      flow: "oauth",
    });

    // You could show a toast notification here
    // For now, we'll just log the error
  };

  const handleEmailSignupSuccess = () => {
    console.log("Email Signup Flow Completed Successfully:", {
      timestamp: new Date().toISOString(),
      redirectTo: "/dashboard",
      flow: "email",
    });

    // Redirect to dashboard after successful email signup
    router.push("/dashboard");
  };

  const renderInitialFlow = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-green rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <span className="text-white font-bold text-lg sm:text-xl">P</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold heading-color mb-2">
          {t("title")}
        </h1>
        <p className="text-sm sm:text-base text-gray-600">{t("subtitle")}</p>
      </div>

      {/* Email Button */}
      <Button
        variant="outline"
        className="w-full h-11 sm:h-12 md:h-14 border-gray-300 hover:bg-gray-50 rounded-xl cursor-pointer min-h-touch text-sm sm:text-base"
        onClick={() => setCurrentFlow("email")}
      >
        <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
        <span className="text-gray-700 font-medium">
          {t("continueWithEmail")}
        </span>
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="bg-white px-3 sm:px-4 text-gray-500">
            {t("orContinueWith")}
          </span>
        </div>
      </div>

      {/* OAuth Buttons */}
      <OAuthButtons onSuccess={handleOAuthSuccess} onError={handleOAuthError} />

      {/* Sign in link */}
      <div className="text-center text-xs sm:text-sm text-gray-600">
        {t("haveAccount")}{" "}
        <Link
          href="/auth/signin"
          className="text-primary-green hover:underline font-medium"
        >
          {t("signIn")}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="h-full page-bg flex flex-col">
      {/* Progress Header - only show during email flow */}
      {currentFlow === "email" && (
        <div className="flex-shrink-0 pt-3 sm:pt-4 pb-1 sm:pb-2">
          <ProgressHeader currentStep={currentStep} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center py-3 sm:py-4 md:py-6">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg px-4 sm:px-6">
          {/* Back button - only show on initial flow */}
          {currentFlow === "initial" && (
            <div className="mb-4 sm:mb-6">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl cursor-pointer min-h-touch"
              >
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm sm:text-base">
                    {t("backToHome")}
                  </span>
                </Link>
              </Button>
            </div>
          )}

          {/* Signup Card - White background, no borders */}
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
            {currentFlow === "initial" && renderInitialFlow()}
            {currentFlow === "email" && (
              <MultiStepSignup
                onBack={() => setCurrentFlow("initial")}
                onSuccess={handleEmailSignupSuccess}
                onStepChange={setCurrentStep}
              />
            )}
          </div>

          {/* Terms and Privacy - only show on initial flow */}
          {currentFlow === "initial" && (
            <div className="text-center text-xs sm:text-sm text-gray-600 px-2 sm:px-4 pb-3 sm:pb-4 mt-6 sm:mt-8">
              By signing up you accept our{" "}
              <Link
                href="/terms"
                className="text-primary-green hover:underline font-medium"
              >
                Terms of use
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary-green hover:underline font-medium"
              >
                Privacy Policy
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
