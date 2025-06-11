"use client";

import { useKYCStore } from "@/lib/stores/kyc-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPhoneNumber } from "@/lib/utils/phone";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const countryCodes = [
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
];

export default function PersonalDetailsStep() {
  const {
    personalDetails,
    updatePersonalDetails,
    setCurrentStep,
    validatePersonalDetails,
    errors,
    clearError,
  } = useKYCStore();

  const handleInputChange = (field: string, value: string) => {
    clearError(field);

    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      updatePersonalDetails({
        [parent]: {
          ...(personalDetails as any)[parent],
          [child]: value,
        },
      });
    } else {
      updatePersonalDetails({ [field]: value });
    }
  };

  const handleContinue = () => {
    if (validatePersonalDetails()) {
      setCurrentStep("verification");
    }
  };

  const generateDays = () => {
    return Array.from({ length: 31 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 18; year >= currentYear - 100; year--) {
      years.push(year.toString());
    }
    return years;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-[#111827] mb-2">
          Fill in your details
        </h1>
        <p className="text-[#4B5563]">
          We&apos;ll use this information to set up your account securely
        </p>
      </div>

      <div className="md:bg-white rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First and Middle Names */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[#4B5563] font-medium">
              First and middle names
            </Label>
            <Input
              id="firstName"
              value={personalDetails.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="David Chibueze"
              className={`${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-[#4B5563] font-medium">
              Last name(s)
            </Label>
            <Input
              id="lastName"
              value={personalDetails.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Samuel"
              className={`${errors.lastName ? "border-red-500" : ""}`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label className="text-[#4B5563] font-medium">Date of birth</Label>
            <div className="flex gap-3">
              {/* Day */}
              <div className="">
                <Select
                  value={personalDetails.dateOfBirth.day}
                  onValueChange={(value) =>
                    handleInputChange("dateOfBirth.day", value)
                  }
                >
                  <SelectTrigger
                    className={`${errors.dateOfBirth ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="01" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateDays().map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month */}
              <div className="">
                <Select
                  value={personalDetails.dateOfBirth.month}
                  onValueChange={(value) =>
                    handleInputChange("dateOfBirth.month", value)
                  }
                >
                  <SelectTrigger
                    className={`${errors.dateOfBirth ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="January" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year */}
              <div className="flex-1">
                <Select
                  value={personalDetails.dateOfBirth.year}
                  onValueChange={(value) =>
                    handleInputChange("dateOfBirth.year", value)
                  }
                >
                  <SelectTrigger
                    className={`${errors.dateOfBirth ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="1992" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateYears().map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label className="text-[#4B5563] font-medium">
              Enter your phone number
            </Label>
            <div className="flex gap-2">
              <Select
                value={personalDetails.phoneNumber.countryCode}
                onValueChange={(value) =>
                  handleInputChange("phoneNumber.countryCode", value)
                }
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                value={personalDetails.phoneNumber.number}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  handleInputChange("phoneNumber.number", formatted);
                }}
                placeholder="80 321 123 45"
                className={`flex-1 ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
                maxLength={13}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleContinue}
            className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 focus:bg-[#0BAB7C]/90 text-white rounded-full py-3 font-medium cursor-pointer transition-colors"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
