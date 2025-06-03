"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  currencies,
  searchCurrencies,
  getCurrencyByCode,
} from "@/lib/currencies";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  showFlag?: boolean;
}

export default function CurrencySelector({
  selectedCurrency,
  onCurrencyChange,
  showFlag = false,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCurrencyData = getCurrencyByCode(selectedCurrency);
  const filteredCurrencies = searchQuery
    ? searchCurrencies(searchQuery)
    : currencies;

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

  const handleCurrencySelect = (currencyCode: string) => {
    onCurrencyChange(currencyCode);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
      >
        {showFlag && selectedCurrencyData && (
          <span className="text-sm w-5 h-5 flex items-center justify-center rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {selectedCurrencyData.flag}
          </span>
        )}
        <span>{selectedCurrency}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      <div
        className={`absolute right-0 top-full w-72 sm:w-80 sm2:w-80 sm3:w-80 md:w-80 md2:w-80 md3:w-80 lg:w-80 lg2:w-80 xl:w-80 2xl:w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl transition-none ${
          isOpen ? "block" : "hidden"
        }`}
        style={{
          animation: "none",
          transition: "none",
          transform: "none",
        }}
      >
        {/* Search */}
        <div className="p-2 sm:p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search currencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-none"
              style={{ transition: "none", animation: "none" }}
            />
          </div>
        </div>

        {/* Currency List */}
        <div className="max-h-48 sm:max-h-60 md:max-h-64 lg:max-h-72 overflow-y-auto">
          {filteredCurrencies.length > 0 ? (
            filteredCurrencies.map((currency) => (
              <button
                key={currency.code}
                type="button"
                onClick={() => handleCurrencySelect(currency.code)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3 text-left transition-none min-h-[44px] ${
                  currency.code === selectedCurrency
                    ? "bg-green-50 text-[#0BAB7C]"
                    : "text-gray-700"
                }`}
                style={{ transition: "none", animation: "none" }}
              >
                <span className="text-sm w-5 h-5 flex items-center justify-center rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {currency.flag}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="font-medium text-sm sm:text-base">
                      {currency.code}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {currency.symbol}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {currency.name}
                  </div>
                </div>
                {currency.code === selectedCurrency && (
                  <div className="w-2 h-2 bg-[#0BAB7C] rounded-full"></div>
                )}
              </button>
            ))
          ) : (
            <div className="px-3 sm:px-4 py-6 sm:py-8 text-center text-gray-500 text-sm sm:text-base">
              No currencies found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
