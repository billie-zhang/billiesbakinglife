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
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed top-0 w-full z-50 bg-[#FAFAF8]/80 backdrop-blur-xl border-b border-black/[0.03]">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif italic tracking-tighter">
              billie's baking life
            </Link>
            <div className="flex gap-10 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
              <Link href="/cookies" className="hover:text-black transition-colors">cookies</Link>
              <Link href="/cakes" className="hover:text-black transition-colors">cakes</Link>
              <Link href="/about" className="hover:text-black transition-colors">about</Link>
            </div>
          </div>
        </nav>

        {children}

        <footer className="border-t border-black/[0.03] py-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400">
            © 2025 billie's baking life — baked with love 🩵
          </p>
        </footer>
      </body>
    </html>
  );
}
