"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getBanksByCountry, searchBanks } from "@/lib/countries-banks";

interface BankSelectorProps {
  selectedBank: string;
  onBankChange: (bankName: string) => void;
  countryCode: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export default function BankSelector({
  selectedBank,
  onBankChange,
  countryCode,
  placeholder = "Select bank",
  error,
  disabled = false,
}: BankSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableBanks = getBanksByCountry(countryCode);
  const filteredBanks = searchQuery
    ? searchBanks(searchQuery, countryCode)
    : availableBanks;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset selected bank when country changes
  useEffect(() => {
    if (selectedBank && !availableBanks.find(bank => bank.name === selectedBank)) {
      onBankChange("");
    }
  }, [countryCode, selectedBank, availableBanks, onBankChange]);

  const handleBankSelect = (bankName: string) => {
    onBankChange(bankName);
    setIsOpen(false);
    setSearchQuery("");
  };

  const getPlaceholderText = () => {
    if (disabled || !countryCode) {
      return "Select country first";
    }
    if (availableBanks.length === 0) {
      return "No banks available";
    }
    return placeholder;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && countryCode && setIsOpen(!isOpen)}
        disabled={disabled || !countryCode || availableBanks.length === 0}
        className={`w-full flex items-center justify-between px-3 py-2 text-left bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0BAB7C] focus:border-[#0BAB7C] ${
          error ? "border-red-500" : "border-gray-300"
        } ${
          disabled || !countryCode || availableBanks.length === 0
            ? "bg-gray-50 cursor-not-allowed"
            : "hover:bg-gray-50 cursor-pointer"
        }`}
      >
        <div className="flex items-center gap-3">
          {selectedBank ? (
            <span className="text-sm text-gray-900">{selectedBank}</span>
          ) : (
            <span className="text-sm text-[#B5B5B5]">{getPlaceholderText()}</span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && countryCode && availableBanks.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search banks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Bank List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredBanks.length > 0 ? (
              filteredBanks.map((bank) => (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => handleBankSelect(bank.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 ${
                    bank.name === selectedBank
                      ? "bg-green-50 text-[#0BAB7C]"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium">{bank.name}</div>
                    {bank.code && (
                      <div className="text-xs text-gray-500">{bank.code}</div>
                    )}
                  </div>
                  {bank.name === selectedBank && (
                    <div className="w-2 h-2 bg-[#0BAB7C] rounded-full"></div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                No banks found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
