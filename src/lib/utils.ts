import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Bangladeshi Taka (BDT)
 */
export function formatCurrency(amount: number, locale: "bn" | "en" = "en"): string {
  if (locale === "bn") {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const formatted = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(amount);

    const bnNumber = formatted.replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
    return `৳${bnNumber}`;
  }

  return `৳${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

/**
 * Convert English number to Bengali digits
 */
export function toBengaliNumber(num: number | string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
}

/**
 * Generate unique IDs for Students, Admissions, and Invoices
 */
export function generateStudentId(serial: number, year: number = new Date().getFullYear()): string {
  return `KGS-${year}-${String(serial).padStart(4, "0")}`;
}

export function generateInvoiceNumber(serial: number, year: number = new Date().getFullYear()): string {
  return `INV-${year}-${String(serial).padStart(5, "0")}`;
}

export function generateAdmissionRef(serial: number): string {
  return `ADM-${Date.now().toString().slice(-4)}-${String(serial).padStart(3, "0")}`;
}
