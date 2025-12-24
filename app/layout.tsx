import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Billie's Baking Life",
  description: "a curated kitchen journal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#F9FAFF] text-[#2D334A] antialiased`}>
        <Navbar />

        <main className="relative">
          {children}
        </main>

        <footer className="bg-[#F1F4FF] py-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#2D334A]/40">
            © {new Date().getFullYear()} billie's baking life — baked with love 🩵
          </p>
        </footer>
      </body>
    </html>
  );
}