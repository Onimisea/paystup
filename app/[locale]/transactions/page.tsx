"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import AuthFooter from "@/components/layout/AuthFooter";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactionsStore } from "@/lib/stores/transactions-store";

export default function TransactionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { updateFilters, applyFilters } = useTransactionsStore();

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ searchQuery });
      applyFilters();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, updateFilters, applyFilters]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1">
              {/* Back Button - Mobile Only */}
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-[#111827] hover:text-[#0BAB7C] focus:text-[#0BAB7C] transition-colors mb-8 cursor-pointer lg:hidden"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </button>

              {/* Page Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#111827] mb-4">
                  Transactions
                </h1>

                {/* Search and Filter Bar */}
                <div className="flex gap-3">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
                    <Input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-gray-200 focus:border-[#0BAB7C] focus:ring-[#0BAB7C]"
                    />
                  </div>

                  {/* Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFiltersOpen(true)}
                    className="px-4 py-2 border-gray-200 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                </div>
              </div>

              {/* Transaction List */}
              <div className="bg-white rounded-lg border border-gray-100 p-6">
                <TransactionList searchQuery={searchQuery} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <AuthFooter />

        {/* Filter Modal */}
        <TransactionFilters
          isOpen={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
        />
      </div>
    </AuthGuard>
  );
}
