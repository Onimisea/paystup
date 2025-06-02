"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { countries, searchCountries, getCountryByCode } from "@/lib/countries-banks";

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
  placeholder?: string;
  error?: string;
}

export default function CountrySelector({
  selectedCountry,
  onCountryChange,
  placeholder = "Select country",
  error,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountryData = getCountryByCode(selectedCountry);
  const filteredCountries = searchQuery
    ? searchCountries(searchQuery)
    : countries;

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

  const handleCountrySelect = (countryCode: string) => {
    onCountryChange(countryCode);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 text-left bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0BAB7C] focus:border-[#0BAB7C] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <div className="flex items-center gap-3">
          {selectedCountryData ? (
            <>
              <span className="text-lg">{selectedCountryData.flag}</span>
              <span className="text-sm text-gray-900">
                {selectedCountryData.name}
              </span>
            </>
          ) : (
            <span className="text-sm text-[#B5B5B5]">{placeholder}</span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 ${
                    country.code === selectedCountry
                      ? "bg-green-50 text-[#0BAB7C]"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{country.name}</div>
                    <div className="text-xs text-gray-500">{country.code}</div>
                  </div>
                  {country.code === selectedCountry && (
                    <div className="w-2 h-2 bg-[#0BAB7C] rounded-full"></div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
