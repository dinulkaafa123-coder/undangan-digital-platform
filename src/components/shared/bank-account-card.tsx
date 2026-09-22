"use client";

import { useState } from "react";
import type { BankAccount } from "@/types/invitation";
import { copyToClipboard } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface BankAccountCardProps {
  account: BankAccount;
  className?: string;
  buttonClassName?: string;
}

export function BankAccountCard({ account, className, buttonClassName }: BankAccountCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(account.accountNumber);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("flex items-center justify-between gap-3 rounded-lg px-4 py-3", className)}>
      <div>
        <p className="text-sm font-semibold">{account.bankName}</p>
        <p className="text-sm tabular-nums">{account.accountNumber}</p>
        <p className="text-xs opacity-80">a.n. {account.accountHolder}</p>
      </div>
      <button type="button" onClick={handleCopy} className={cn("shrink-0 rounded-md px-3 py-1.5 text-xs font-medium", buttonClassName)}>
        {copied ? "Tersalin!" : "Salin"}
      </button>
    </div>
  );
}
