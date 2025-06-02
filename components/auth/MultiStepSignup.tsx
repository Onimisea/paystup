"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowLeft,
  Mail,
  Lock,
  Globe,
  Check,
  Eye,
  EyeClosed,
} from "lucide-react";
import CountrySelector from "./CountrySelector";
import { signUp } from "@/lib/auth-client";
import { useAuthStore } from "@/lib/stores/auth-store";
import {
  processPassword,
  PasswordValidationResult,
  getPasswordStrengthColor,
  getPasswordStrengthText,
  validatePassword,
} from "@/lib/password-validation";

type SignupStep = "email" | "verification" | "password" | "country";

// Zod schemas for each step
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const verificationSchema = z.object({
  verificationCode: z
    .string()
    .min(6, "Verification code must be 6 digits")
    .max(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .refine(
        (password) => {
          const validation = validatePassword(password.trim());
          return validation.isValid;
        },
        {
          message: "Password does not meet security requirements",
        }
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const countrySchema = z.object({
  country: z.string().min(1, "Please select your country"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type VerificationFormData = z.infer<typeof verificationSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;
type CountryFormData = z.infer<typeof countrySchema>;

interface MultiStepSignupProps {
  onBack: () => void;
  onSuccess: () => void;
  onStepChange?: (step: SignupStep) => void;
}

export default function MultiStepSignup({
  onBack,
  onSuccess,
  onStepChange,
}: MultiStepSignupProps) {
  const t = useTranslations("Auth.signup");
  const { setUser } = useAuthStore();
  const [currentStep, setCurrentStep] = useState<SignupStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
    country: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidationResult | null>(null);
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState<PasswordValidationResult | null>(null);
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field === "password") {
      const { trimmed, validation } = processPassword(value);
      setFormData((prev) => ({ ...prev, [field]: trimmed }));
      setPasswordValidation(validation);
    } else if (field === "confirmPassword") {
      const { trimmed, validation } = processPassword(value);
      setFormData((prev) => ({ ...prev, [field]: trimmed }));
      setConfirmPasswordValidation(validation);
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailStep = async () => {
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    // Console log the email step data
    console.log("Email Step - Submitted Data:", {
      email: formData.email,
      step: "email",
      timestamp: new Date().toISOString(),
    });

    setIsLoading(true);
    try {
      // In a real implementation, you would send verification email here
      // For now, we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStep("verification");
      onStepChange?.("verification");
    } catch {
      setErrors({ email: "Failed to send verification email" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationStep = async () => {
    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      setErrors({ verificationCode: "Please enter a valid 6-digit code" });
      return;
    }

    // Console log the verification step data
    console.log("Verification Step - Submitted Data:", {
      email: formData.email,
      verificationCode: formData.verificationCode,
      step: "verification",
      timestamp: new Date().toISOString(),
    });

    setIsLoading(true);
    try {
      // In a real implementation, you would verify the code here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStep("password");
      onStepChange?.("password");
    } catch {
      setErrors({ verificationCode: "Invalid verification code" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordStep = () => {
    setShowPasswordErrors(true);
    const newErrors: Record<string, string> = {};

    // Validate password with comprehensive rules
    const { trimmed: trimmedPassword, validation } = processPassword(
      formData.password
    );
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validation.isValid) {
      newErrors.password = validation.errors[0]; // Show first error
    }

    // Validate confirm password
    const { trimmed: trimmedConfirmPassword, validation: confirmValidation } =
      processPassword(formData.confirmPassword);
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (!confirmValidation.isValid) {
      newErrors.confirmPassword = confirmValidation.errors[0]; // Show first error
    } else if (trimmedPassword !== trimmedConfirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Console log the password step data
    console.log("Password Step - Submitted Data:", {
      email: formData.email,
      verificationCode: formData.verificationCode,
      password: "***HIDDEN***", // Don't log actual password for security
      confirmPassword: "***HIDDEN***", // Don't log actual password for security
      passwordLength: formData.password.length,
      passwordsMatch: formData.password === formData.confirmPassword,
      step: "password",
      timestamp: new Date().toISOString(),
    });

    setCurrentStep("country");
    onStepChange?.("country");
  };

  const handleCountryStep = async () => {
    if (!formData.country) {
      setErrors({ country: "Please select your country" });
      return;
    }

    // Console log the final step data (complete signup data)
    console.log("Final Step (Country) - Complete Signup Data:", {
      email: formData.email,
      verificationCode: formData.verificationCode,
      password: "***HIDDEN***", // Don't log actual password for security
      passwordLength: formData.password.length,
      country: formData.country,
      name: formData.email.split("@")[0],
      step: "country",
      timestamp: new Date().toISOString(),
      allStepsCompleted: true,
    });

    setIsLoading(true);
    try {
      const userName = formData.email.split("@")[0]; // Use email prefix as name for now

      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: userName,
      });

      // Store user data in auth store
      setUser(
        {
          email: formData.email,
          name: userName,
          country: formData.country,
          avatar:
            userName.charAt(0).toUpperCase() +
              userName.charAt(1)?.toUpperCase() || "",
        },
        "email"
      );

      // Console log successful account creation
      console.log("Account Creation Successful:", {
        email: formData.email,
        country: formData.country,
        timestamp: new Date().toISOString(),
        status: "success",
        storedInAuthStore: true,
      });

      onSuccess();
    } catch (error) {
      console.error("Account Creation Failed:", {
        email: formData.email,
        country: formData.country,
        error: error,
        timestamp: new Date().toISOString(),
        status: "failed",
      });
      setErrors({ country: "Failed to create account. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep === "email") {
      onBack();
    } else {
      const steps: SignupStep[] = [
        "email",
        "verification",
        "password",
        "country",
      ];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex > 0) {
        const previousStep = steps[currentIndex - 1];
        setCurrentStep(previousStep);
        onStepChange?.(previousStep);
      }
    }
  };

  const getStepIcon = (step: SignupStep) => {
    switch (step) {
      case "email":
        return Mail;
      case "verification":
        return Check;
      case "password":
        return Lock;
      case "country":
        return Globe;
    }
  };

  const renderStep = () => {
    const StepIcon = getStepIcon(currentStep);

    switch (currentStep) {
      case "email":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <StepIcon className="w-5 h-5 text-primary-green" />
              </div>
              <h2 className="text-xl font-bold heading-color">
                {t("steps.email.title")}
              </h2>
              <p className="text-gray-600 text-sm">
                {t("steps.email.subtitle")}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="form-label">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder={t("steps.email.emailPlaceholder")}
                className="w-full form-placeholder"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <Button
              onClick={handleEmailStep}
              className="w-full rounded-xl cursor-pointer"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : t("steps.email.continue")}
            </Button>
          </div>
        );

      case "verification":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <StepIcon className="w-5 h-5 text-primary-green" />
              </div>
              <h2 className="text-xl font-bold heading-color">
                {t("steps.verification.title")}
              </h2>
              <p className="text-gray-600 text-sm">
                {t("steps.verification.subtitle")}{" "}
                <strong>{formData.email}</strong>
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="code" className="form-label">
                Verification Code
              </Label>
              <Input
                id="code"
                type="text"
                maxLength={6}
                value={formData.verificationCode}
                onChange={(e) =>
                  handleInputChange("verificationCode", e.target.value)
                }
                placeholder={t("steps.verification.codePlaceholder")}
                className="w-full form-placeholder text-center text-lg tracking-widest"
              />
              {errors.verificationCode && (
                <p className="text-red-500 text-sm">
                  {errors.verificationCode}
                </p>
              )}
            </div>
            <Button
              onClick={handleVerificationStep}
              className="w-full rounded-xl cursor-pointer"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : t("steps.verification.continue")}
            </Button>
            <Button
              variant="ghost"
              className="w-full rounded-xl cursor-pointer"
            >
              {t("steps.verification.resend")}
            </Button>
          </div>
        );

      case "password":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <StepIcon className="w-5 h-5 text-primary-green" />
              </div>
              <h2 className="text-xl font-bold heading-color">
                {t("steps.password.title")}
              </h2>
              <p className="text-gray-600 text-sm">
                {t("steps.password.subtitle")}
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="form-label">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder={t("steps.password.passwordPlaceholder")}
                    className="w-full form-placeholder pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeClosed className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                {showPasswordErrors &&
                  passwordValidation &&
                  !passwordValidation.isValid && (
                    <div className="mt-2 space-y-1">
                      {passwordValidation.errors.map((error, index) => (
                        <p key={index} className="text-red-500 text-xs">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                {passwordValidation && passwordValidation.isValid && (
                  <div className="mt-2">
                    <p
                      className={`text-xs ${getPasswordStrengthColor(
                        passwordValidation.strength
                      )}`}
                    >
                      Password strength:{" "}
                      {getPasswordStrengthText(passwordValidation.strength)}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder={t("steps.password.confirmPlaceholder")}
                    className="w-full form-placeholder pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeClosed className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
                {showPasswordErrors &&
                  confirmPasswordValidation &&
                  !confirmPasswordValidation.isValid && (
                    <div className="mt-2 space-y-1">
                      {confirmPasswordValidation.errors.map((error, index) => (
                        <p key={index} className="text-red-500 text-xs">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
              </div>
            </div>
            <Button
              onClick={handlePasswordStep}
              className="w-full rounded-xl cursor-pointer"
              size="lg"
            >
              {t("steps.password.continue")}
            </Button>
          </div>
        );

      case "country":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <StepIcon className="w-5 h-5 text-primary-green" />
              </div>
              <h2 className="text-xl font-bold heading-color">
                {t("steps.country.title")}
              </h2>
              <p className="text-gray-600 text-sm">
                {t("steps.country.subtitle")}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country" className="form-label">
                Country
              </Label>
              <CountrySelector
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
                placeholder={t("steps.country.countryPlaceholder")}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
            <Button
              onClick={handleCountryStep}
              className="w-full rounded-xl cursor-pointer"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : t("steps.country.continue")}
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 rounded-xl cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Step content */}
      {renderStep()}
    </div>
  );
}
