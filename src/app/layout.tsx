import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { Toaster } from "sonner";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const siliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bloom Kindergarten & Junior Academy | আনন্দময় শৈশব ও আধুনিক শিক্ষাঙ্গন",
  description:
    "A premier kindergarten school in Uttara, Dhaka offering Play Group, Nursery, KG, and Class 1 with child-centered play learning, CCTV safety, and integrated school management.",
  keywords: [
    "kindergarten school dhaka",
    "play group admission",
    "nursery school uttara",
    "কিন্ডারগার্টেন স্কুল ঢাকা",
    "প্লে গ্রুপ ভর্তি ২০২৬",
    "school erp system",
  ],
  authors: [{ name: "Bloom Kindergarten Academy" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${siliguri.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FFFDF7] text-slate-800">
        <LanguageProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
