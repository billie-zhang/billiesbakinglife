'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

export default function RecipePage({ params }: { params: any }) {
    const [recipe, setRecipe] = useState<any>(null);
    const [multiplier, setMultiplier] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadRecipe() {
            const resolvedParams = await params;
            try {
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


    const scaleAmount = (amount: string, m: number) => {
        if (m === 1 || amount === "Optional" || amount === "pinch") return amount;

        // Map for Unicode fractions
        const unicodeMap: { [key: string]: number } = { '½': 0.5, '⅓': 0.33, '⅔': 0.66, '¼': 0.25, '¾': 0.75 };

        return amount.replace(/([½⅓⅔¼¾]|\d+\/\d+|\d+(\.\d+)?)/g, (match) => {
            let num: number;

            if (unicodeMap[match]) {
                num = unicodeMap[match];
            } else if (match.includes('/')) {
                const [top, bottom] = match.split('/');
                num = parseInt(top) / parseInt(bottom);
            } else {
                num = parseFloat(match);
            }

            const total = num * m;
            // Clean up trailing decimals (e.g., 1.0 -> 1)
            return Number.isInteger(total) ? total.toString() : total.toFixed(2).replace(/\.?0+$/, "");
        });
    };

    if (isLoading) return <div className="min-h-screen bg-[#FAFAF8]" />;
    if (!recipe) return notFound();

    return (
        <div className="bg-[#FAFAF8] min-h-screen pb-40 selection:bg-rose-100 antialiased">

            <main className="max-w-7xl mx-auto px-8 pt-48">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-24 gap-y-32">

                    <div className="lg:col-span-5">
                        <section className="mb-16">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/5 text-emerald-800 text-[10px] uppercase font-bold tracking-widest mb-8">
                                {recipe.category}
                            </span>
                            <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] tracking-tighter mb-10">
                                {recipe.name}
                            </h1>

                            <div className="flex gap-10 py-8 border-y border-black/[0.05] mb-12 bg-blue-50/30 px-6 rounded-3xl">
                                <div><span className="block text-[10px] uppercase tracking-widest text-black/40 mb-2">Prep</span><span className="font-serif italic">{recipe.prepTime}</span></div>
                                <div><span className="block text-[10px] uppercase tracking-widest text-black/40 mb-2">Bake</span><span className="font-serif italic">{recipe.cookTime}</span></div>
                                <div><span className="block text-[10px] uppercase tracking-widest text-black/40 mb-2">Yield</span><span className="font-serif italic">
                                    {multiplier > 1 ? parseInt(recipe.servings) * multiplier + " units" : recipe.servings}
                                </span></div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-serif italic text-slate-400">ingredients</h2>

                                <div className="flex bg-black/[0.03] p-1 rounded-full border border-black/[0.05]">
                                    {[1, 2, 3].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => setMultiplier(num)}
                                            className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${multiplier === num ? 'bg-white shadow-sm text-black' : 'text-black/30 hover:text-black'}`}
                                        >
                                            {num}x
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <ul className="space-y-6">
                                {recipe.ingredients.map((ing: any, i: number) => (
                                    <li key={i} className="flex justify-between items-baseline border-b border-black/[0.03] pb-4 group">
                                        <span className="text-slate-600 font-light group-hover:text-black transition-colors">{ing.item}</span>
                                        <span className="text-black font-medium text-sm tabular-nums">
                                            {scaleAmount(ing.amount, multiplier)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="aspect-[4/3] bg-[#F5E6E8] rounded-[4rem] mb-24 shadow-inner overflow-hidden" />

                        <div className="max-w-xl">
                            <h2 className="text-2xl font-serif italic text-slate-400 mb-10">directions</h2>
                            <div className="space-y-8">
                                {recipe.directions.map((step: string, i: number) => (
                                    <div key={i} className="flex gap-8 group">
                                        <span className="flex-none w-10 h-10 rounded-full bg-[#E8F0E6] flex items-center justify-center text-[10px] font-bold text-emerald-900/40">
                                            {i + 1}
                                        </span>
                                        <p className="text-xl leading-[1.7] text-slate-600 font-light">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {recipe.notes && (
                                <div className="mt-24 p-12 bg-[#E8F0E6] rounded-[3rem] border border-emerald-900/5 relative overflow-hidden">
                                    <h3 className="font-serif italic text-xl mb-4 text-emerald-900/80">notes</h3>
                                    <p className="text-emerald-900/60 font-light leading-relaxed italic text-lg">
                                        “{recipe.notes}”
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}