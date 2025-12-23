'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const cardColors = ["bg-[#E0E7FF]", "bg-[#F3E8FF]", "bg-[#EBEBFF]"];

export default function SearchSection({ recipes }: { recipes: any[] }) {
    const [query, setQuery] = useState('');

    const filteredRecipes = query.length > 2
        ? recipes.filter(r =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
        : [];

    return (
        <section className="bg-[#F1F4FF] py-32 mb-52 transition-all duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif leading-tight text-[#2D334A] mb-12">
                        looking for <br /> <span className="italic opacity-30">something specific?</span>
                    </h2>
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="find your next favorite recipe"
                            className="w-full bg-white rounded-full py-5 px-10 text-[10px] uppercase tracking-[0.2em] focus:ring-8 focus:ring-[#6366F1]/5 shadow-sm outline-none placeholder:text-[#2D334A]/50 text-[#2D334A] transition-all"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#2D334A]/40">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {filteredRecipes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {filteredRecipes.map((recipe, index) => (
                            <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group block bg-white p-4 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                                <div className="relative aspect-video overflow-hidden rounded-[1.5rem] mb-5">
                                    {recipe.image ? (
                                        <Image src={recipe.image} alt={recipe.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className={`w-full h-full ${cardColors[index % cardColors.length]}`} />
                                    )}
                                </div>
                                <h3 className="text-[9px] uppercase tracking-widest text-[#2D334A] ml-3 mb-1">{recipe.name}</h3>
                            </Link>
                        ))}
                    </div>
                )}

                {query.length > 2 && filteredRecipes.length === 0 && (
                    <p className="text-center font-serif italic opacity-30">no recipes found for "{query}"</p>
                )}
            </div>
        </section>
    );
}