"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import * as React from "react";
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
  processPassword,
  PasswordValidationResult,
  validatePassword,
} from "@/lib/password-validation";
import { signIn } from "@/lib/auth-client";
import { useAuthStore } from "@/lib/stores/auth-store";

// Zod schema for signin form validation
const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
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
  rememberMe: z.boolean(),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function LoginClient() {
  const t = useTranslations("Auth.login");
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleOAuthSuccess = () => {
    // Note: OAuth user data would typically come from the OAuth provider
    // For now, we'll set a placeholder that can be updated later
    setUser(
      {
        email: "oauth@example.com", // This would come from OAuth provider
        name: "OAuth User", // This would come from OAuth provider
        avatar: "OU",
      },
      "google" // This would be determined by which OAuth provider was used
    );

    console.log("OAuth Login Success:", {
      timestamp: new Date().toISOString(),
      redirectTo: "/dashboard",
      flow: "oauth-login",
      storedInAuthStore: true,
    });
    router.push("/dashboard");
  };

  const handleOAuthError = (error: string) => {
    console.error("OAuth Login Error:", {
      error,
      timestamp: new Date().toISOString(),
      flow: "oauth-login",
    });
  };

  const onSubmit = async (data: SigninFormData) => {
    setError(null);
    setIsLoading(true);

    // Process password for validation and trimming
    const { trimmed: trimmedPassword, validation } = processPassword(
      data.password
    );

    try {
      console.log("📝 Signin Form Submitted:", {
        email: data.email.trim(),
        passwordStrength: validation.strength,
        rememberMe: data.rememberMe,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        formValidation: "passed",
      });

      // Attempt to sign in with Better Auth
      await signIn.email({
        email: data.email.trim(),
        password: trimmedPassword,
        rememberMe: data.rememberMe,
      });

      // Store user data in auth store
      const userName = data.email.split("@")[0];
      setUser(
        {
          email: data.email.trim(),
          name: userName,
          avatar:
            userName.charAt(0).toUpperCase() +
              userName.charAt(1)?.toUpperCase() || "",
        },
        "email"
      );

      console.log("✅ Signin Success:", {
        timestamp: new Date().toISOString(),
        redirectTo: "/dashboard",
        flow: "email-signin",
        storedInAuthStore: true,
      });

      // Redirect to dashboard after successful signin
      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ Signin Error:", {
        error: error.message || error,
        timestamp: new Date().toISOString(),
        email: data.email.trim(),
      });

      setError(
        error.message ||
          "Sign in failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Watch password field for real-time validation
  const watchedPassword = form.watch("password");

  // Update password validation when password changes
  React.useEffect(() => {
    if (watchedPassword) {
      const { validation } = processPassword(watchedPassword);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation(null);
    }
  }, [watchedPassword]);

  return (
    <div className="min-h-screen page-bg flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm sm:max-w-md px-4 sm:px-0">
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-xl cursor-pointer min-h-touch"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">{t("backToHome")}</span>
            </Link>
          </Button>
        </div>

        {/* Login Card */}
        <div className="md:bg-white rounded-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-green rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white font-bold text-lg sm:text-xl">P</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold heading-color">
              {t("title")}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {t("subtitle")}
            </p>
          </div>

          <Form {...form}>
            <form
              className="space-y-3 sm:space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("email")}
                        className="w-full form-placeholder min-h-touch text-touch"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">
                      {t("password")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={t("password")}
                          className="w-full form-placeholder pr-10 min-h-touch text-touch"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 min-h-touch min-w-touch"
                        >
                          {showPassword ? (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <EyeClosed className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    {passwordValidation &&
                      !passwordValidation.isValid &&
                      field.value && (
                        <div className="mt-2 space-y-1">
                          {passwordValidation.errors.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">
                              {error}
                            </p>
                          ))}
                        </div>
                      )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                        {t("rememberMe")}
                      </label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-primary-green hover:underline"
                      >
                        {t("forgotPassword")}
                      </Link>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full rounded-xl cursor-pointer min-h-touch text-touch"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : t("signIn")}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative mt-4 sm:mt-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="bg-white px-3 sm:px-4 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="mt-3 sm:mt-4">
            <OAuthButtons
              layout="horizontal"
              onSuccess={handleOAuthSuccess}
              onError={handleOAuthError}
            />
          </div>

          <div className="text-center text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6">
            {t("noAccount")}{" "}
            <Link
              href="/auth/signup"
              className="text-primary-green hover:underline font-medium"
            >
              {t("signUp")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
