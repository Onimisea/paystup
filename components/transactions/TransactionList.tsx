"use client";

import { useMemo } from "react";
import { ArrowLeftRight } from "lucide-react";
import {
  useTransactionsStore,
  Transaction,
} from "@/lib/stores/transactions-store";
import { useTranslations } from "next-intl";

interface TransactionListProps {
  searchQuery: string;
}

export default function TransactionList({ searchQuery }: TransactionListProps) {
  const { filteredTransactions, isLoading } = useTransactionsStore();
  const t = useTranslations("Transactions");

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};

    filteredTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let groupKey: string;

      if (date.toDateString() === today.toDateString()) {
        groupKey = t("today");
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = t("yesterday");
      } else {
        groupKey = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(transaction);
    });

    return groups;
  }, [filteredTransactions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "text-[#10B981]";
      case "pending":
        return "text-[#F59E0B]";
      case "unsuccessful":
        return "text-[#EF4444]";
      default:
        return "text-[#4B5563]";
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#0BAB7C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (Object.keys(groupedTransactions).length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeftRight className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-[#111827] mb-2">
            {t("noTransactions")}
          </h3>
          <p className="text-[#4B5563]">
            {searchQuery ||
            filteredTransactions.length !==
              useTransactionsStore.getState().transactions.length
              ? t("tryAdjusting")
              : t("willAppearHere")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([dateGroup, transactions]) => (
        <div key={dateGroup}>
          <h3 className="text-sm font-medium text-[#4B5563] mb-3">
            {dateGroup}
          </h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 md:bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {/* Transaction Icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: transaction.iconColor }}
                  >
                    {transaction.type === "conversion" ? (
                      <ArrowLeftRight className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-medium">
                        {transaction.icon}
                      </span>
                    )}
                  </div>

                  {/* Transaction Details */}
                  <div>
                    <p className="text-sm font-medium text-[#111827]">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#4B5563]">
                        {transaction.type === "send"
                          ? t("types.send")
                          : transaction.type === "receive"
                          ? t("types.receive")
                          : transaction.type === "conversion"
                          ? t("types.conversion")
                          : t("types.transaction")}{" "}
                        • {t("today")}
                      </span>
                      <span
                        className={`text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#111827]">
                    {formatAmount(transaction.amount)} {transaction.currency}
                  </p>
                  {transaction.reference && (
                    <p className="text-xs text-[#4B5563] mt-1">
                      {t("reference")}: {transaction.reference}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
