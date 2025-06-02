"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  useTransactionsStore,
  TransactionStatus,
  TransactionType,
  Currency,
} from "@/lib/stores/transactions-store";

interface TransactionFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const statusOptions: {
  value: TransactionStatus;
  label: string;
  color: string;
}[] = [
  { value: "successful", label: "Successful", color: "#10B981" },
  { value: "pending", label: "Pending", color: "#F59E0B" },
  { value: "unsuccessful", label: "Unsuccessful", color: "#EF4444" },
];

const typeOptions: { value: TransactionType; label: string }[] = [
  { value: "send", label: "Transfers" },
  { value: "receive", label: "Card transactions" },
  { value: "conversion", label: "Money added" },
  { value: "card_transaction", label: "Conversions" },
  { value: "cash_withdrawal", label: "Cash withdrawals" },
];

const currencyOptions: { value: Currency; label: string; flag: string }[] = [
  { value: "NGN", label: "NGN", flag: "🇳🇬" },
  { value: "INR", label: "INR", flag: "🇮🇳" },
  { value: "USD", label: "USD", flag: "🇺🇸" },
  { value: "EUR", label: "EUR", flag: "🇪🇺" },
  { value: "GBP", label: "GBP", flag: "🇬🇧" },
];

const datePresets = [
  { label: "Last month", value: "last_month" },
  { label: "Last quarter", value: "last_quarter" },
  { label: "Last year", value: "last_year" },
];

export default function TransactionFilters({
  isOpen,
  onClose,
}: TransactionFiltersProps) {
  const { filters, updateFilters, clearFilters, applyFilters } =
    useTransactionsStore();
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  const handleStatusToggle = (status: TransactionStatus) => {
    const newStatus = localFilters.status.includes(status)
      ? localFilters.status.filter((s) => s !== status)
      : [...localFilters.status, status];

    setLocalFilters({ ...localFilters, status: newStatus });
  };

  const handleTypeToggle = (type: TransactionType) => {
    const newTypes = localFilters.type.includes(type)
      ? localFilters.type.filter((t) => t !== type)
      : [...localFilters.type, type];

    setLocalFilters({ ...localFilters, type: newTypes });
  };

  const handleCurrencyToggle = (currency: Currency) => {
    const newCurrencies = localFilters.currency.includes(currency)
      ? localFilters.currency.filter((c) => c !== currency)
      : [...localFilters.currency, currency];

    setLocalFilters({ ...localFilters, currency: newCurrencies });
  };

  const handleDatePreset = (preset: string) => {
    const now = new Date();
    let from: Date;

    switch (preset) {
      case "last_month":
        from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case "last_quarter":
        from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case "last_year":
        from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        return;
    }

    setLocalFilters({
      ...localFilters,
      dateRange: {
        from: from.toISOString().split("T")[0],
        to: now.toISOString().split("T")[0],
      },
    });
  };

  const handleApply = () => {
    updateFilters(localFilters);
    applyFilters();
    onClose();
  };

  const handleClearAll = () => {
    setLocalFilters({
      dateRange: { from: null, to: null },
      status: [],
      type: [],
      currency: [],
      searchQuery: "",
    });
    clearFilters();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#111827]">Filters</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#4B5563]" />
            </button>
          </div>

          {/* Date Section */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-[#111827] mb-3 block">
              Date
            </Label>

            {/* Date Presets */}
            <div className="flex gap-2 mb-4">
              {datePresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handleDatePreset(preset.value)}
                  className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Date Inputs */}
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-[#4B5563] mb-1 block">
                  From
                </Label>
                <Input
                  type="date"
                  value={localFilters.dateRange.from || ""}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      dateRange: {
                        ...localFilters.dateRange,
                        from: e.target.value,
                      },
                    })
                  }
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-[#4B5563] mb-1 block">To</Label>
                <Input
                  type="date"
                  value={localFilters.dateRange.to || ""}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      dateRange: {
                        ...localFilters.dateRange,
                        to: e.target.value,
                      },
                    })
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-[#111827] mb-3 block">
              Status
            </Label>
            <div className="space-y-3">
              {statusOptions.map((status) => (
                <div
                  key={status.value}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: status.color }}
                    >
                      {status.value === "successful" && (
                        <span className="text-white text-xs">✓</span>
                      )}
                      {status.value === "pending" && (
                        <span className="text-white text-xs">○</span>
                      )}
                      {status.value === "unsuccessful" && (
                        <span className="text-white text-xs">✕</span>
                      )}
                    </div>
                    <span className="text-sm text-[#111827]">
                      {status.label}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={localFilters.status.includes(status.value)}
                    onChange={() => handleStatusToggle(status.value)}
                    className="w-4 h-4 text-[#0BAB7C] border-gray-300 rounded focus:ring-[#0BAB7C]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Type Section */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-[#111827] mb-3 block">
              Transaction type
            </Label>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleTypeToggle(type.value)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    localFilters.type.includes(type.value)
                      ? "bg-[#0BAB7C] text-white border-[#0BAB7C]"
                      : "border-gray-300 text-[#4B5563] hover:bg-gray-50"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Currency Section */}
          <div className="mb-8">
            <Label className="text-sm font-medium text-[#111827] mb-3 block">
              Currency
            </Label>
            <div className="flex flex-wrap gap-2">
              {currencyOptions.map((currency) => (
                <button
                  key={currency.value}
                  onClick={() => handleCurrencyToggle(currency.value)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
                    localFilters.currency.includes(currency.value)
                      ? "bg-[#0BAB7C] text-white border-[#0BAB7C]"
                      : "border-gray-300 text-[#4B5563] hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base">{currency.flag}</span>
                  <span>{currency.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex-1 border-gray-300 text-[#4B5563] hover:bg-gray-50"
            >
              Clear all
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-[#0BAB7C] hover:bg-[#059669] text-white"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
