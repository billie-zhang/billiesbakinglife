'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ease-in-out
      h-20 md:h-24 flex items-center justify-between px-8 md:px-16

      ${isScrolled
                ? 'bg-[#FCFDFF]/95 backdrop-blur-3xl shadow-sm'
                : 'bg-transparent backdrop-blur-0'
            }
    `}>

            <Link href="/" className="text-xl md:text-2xl font-serif italic tracking-tighter text-[#2D334A]">
                billie's baking life
            </Link>

            <div className="flex gap-8 md:gap-14 text-[10px] uppercase tracking-[0.4em] font-bold text-[#2D334A]/40">
                <Link href="/cookies" className="hover:text-[#6366F1] transition-colors">cookies</Link>
                <Link href="/cakes" className="hover:text-[#6366F1] transition-colors">cakes</Link>
                <Link href="/about" className="hover:text-[#6366F1] transition-colors">about</Link>
            </div>
        </nav>
    );
}