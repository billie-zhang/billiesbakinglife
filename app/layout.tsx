import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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

        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-[#E0E7FF]">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif italic tracking-tighter hover:opacity-60 transition-opacity">
              billie's baking life
            </Link>
            <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-[#2D334A]/40">
              <Link href="/cookies" className="hover:text-[#6366F1] transition-colors">cookies</Link>
              <Link href="/cakes" className="hover:text-[#6366F1] transition-colors">cakes</Link>
              <Link href="/about" className="hover:text-[#6366F1] transition-colors">about</Link>
            </div>
          </div>
        </nav>

        {children}

        <footer className="border-t border-[#E0E7FF] py-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#2D334A]/30">
            © 2025 billie's baking life — baked with love 🩵
          </p>
        </footer>
      </body>
    </html>
  );
}