'use client'; // This is the key fix for your button error!

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Note: In a real app, you'd fetch this from your data folder.
// For this interactive version, we'll simulate the data fetching 
// or you can pass the data from a server component to this client component.

export default function RecipePage({ params }: { params: any }) {
    const [recipe, setRecipe] = useState<any>(null);
    const [multiplier, setMultiplier] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Handling the "Promise" and Data Fetching in Client Mode
    useEffect(() => {
        async function loadRecipe() {
            const resolvedParams = await params;
            try {
                // In client-side, we fetch from an API route or a dynamic import
                // For now, we'll use a dynamic import assumption
                const data = await import(`@/data/recipes/${resolvedParams.slug}.json`);
                setRecipe(data.default);
            } catch (e) {
                console.error("Recipe not found");
            } finally {
                setIsLoading(false);
            }
        }
        loadRecipe();
    }, [params]);

    if (isLoading) return <div className="min-h-screen bg-[#FAFAF8]" />;
    if (!recipe) return notFound();

    {/* TODO: doesn't work on things like 1/2 cup */ }
    const scaleAmount = (amount: string, m: number) => {
        if (m === 1) return amount;
        // Simple logic: if it's a number, multiply it. 
        // For a pro site, you'd use a library like 'fraction.js'
        return amount.replace(/(\d+)/g, (match) => (parseFloat(match) * m).toString());
    };

    return (
        <div className="bg-[#FAFAF8] min-h-screen pb-40 selection:bg-rose-100 antialiased">

            <header className="max-w-7xl mx-auto px-8 pt-32 mb-16">
                <Link href="/" className="group inline-flex items-center text-[12px] uppercase tracking-[0.3em] font-bold text-black/30 hover:text-black transition-all">
                    <span className="mr-3 transition-transform group-hover:-translate-x-2">←</span>
                    Back to collection
                </Link>
            </header>

            <main className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-24 gap-y-20">

                    <div className="lg:col-span-5">
                        <div className="mb-10">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/5 text-emerald-800 text-[10px] uppercase font-bold tracking-widest mb-8">
                                {recipe.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tighter mb-10">
                                {recipe.name}
                            </h1>

                            <div className="flex gap-10 py-8 border-y border-black/[0.05] mb-12 bg-blue-50/30 px-6 rounded-2xl">
                                <div><span className="block text-[10px] uppercase tracking-widest text-black/40 mb-2">Prep</span><span className="font-serif italic">{recipe.prepTime}</span></div>
                                <div><span className="block text-[10px] uppercase tracking-widest text-black/40 mb-2">Bake</span><span className="font-serif italic">{recipe.cookTime}</span></div>
                                <div><span className="block text-[10px] uppercase tracking-widest text-black/40 mb-2">Yield</span><span className="font-serif italic">{multiplier > 1 ? parseInt(recipe.servings) * multiplier + " tarts" : recipe.servings}</span></div>
                            </div>
                        </div>

                        {/* SCALE TOGGLE */}
                        {/* TODO: doesn't work on things like 1/2 cup */}
                        {/* <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-serif italic text-slate-400">Ingredients</h2>
                            <div className="flex bg-black/[0.03] p-1 rounded-full border border-black/[0.05]">
                                <button
                                    onClick={() => setMultiplier(1)}
                                    className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${multiplier === 1 ? 'bg-white shadow-sm text-black' : 'text-black/30 hover:text-black'}`}
                                >
                                    1x
                                </button>
                                <button
                                    onClick={() => setMultiplier(2)}
                                    className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${multiplier === 2 ? 'bg-white shadow-sm text-black' : 'text-black/30 hover:text-black'}`}
                                >
                                    2x
                                </button>
                            </div>
                        </div> */}

                        <ul className="space-y-5">
                            {recipe.ingredients.map((ing: any, i: number) => (
                                <li key={i} className="flex justify-between items-baseline border-b border-black/[0.03] pb-3 group">
                                    <span className="text-slate-600 font-light group-hover:text-black transition-colors">{ing.item}</span>
                                    <span className="text-black font-medium text-sm tabular-nums">
                                        {scaleAmount(ing.amount, multiplier)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="aspect-[4/3] bg-[#F5E6E8] rounded-[3.5rem] mb-20 shadow-inner" />
                        <div className="max-w-xl">
                            <h2 className="text-2xl font-serif italic text-slate-400 mb-12">Directions</h2>
                            <div className="space-y-8">
                                {recipe.directions.map((step: string, i: number) => (
                                    <div key={i} className="flex gap-8 group">
                                        <span className="flex-none w-10 h-10 rounded-full bg-[#E8F0E6] flex items-center justify-center text-xs font-bold text-emerald-900/40 transition-transform group-hover:scale-110">
                                            {i + 1}
                                        </span>
                                        <p className="text-xl leading-[1.7] text-slate-600 font-light">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* FIXED FOOTER BUTTON */}
            <footer className="max-w-7xl mx-auto px-8 mt-40 pt-10 border-t border-black/[0.03] text-center">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20 hover:text-black transition-all cursor-pointer"
                >
                    Back to top
                </button>
            </footer>
        </div>
    );
}