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
            } catch (e) { console.error(e); } finally { setIsLoading(false); }
        }
        loadRecipe();
    }, [params]);

    const scaleAmount = (amount: string, m: number) => {
        if (m === 1) return amount;
        const unicodeMap: { [key: string]: number } = { '½': 0.5, '⅓': 0.33, '⅔': 0.66, '¼': 0.25, '¾': 0.75 };
        return amount.replace(/([½⅓⅔¼¾]|\d+\/\d+|\d+(\.\d+)?)/g, (match) => {
            let num = unicodeMap[match] || (match.includes('/') ? (parseInt(match.split('/')[0]) / parseInt(match.split('/')[1])) : parseFloat(match));
            const total = num * m;
            return Number.isInteger(total) ? total.toString() : total.toFixed(2).replace(/\.?0+$/, "");
        });
    };

    if (isLoading) return <div className="min-h-screen bg-[#F9FAFF]" />;
    if (!recipe) return notFound();

    return (
        <div className="pt-48 pb-40 px-8">
            <main className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

                    <div className="lg:col-span-5">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#E0E7FF] text-[#6366F1] text-[10px] uppercase font-bold tracking-widest mb-8">
                            {recipe.category}
                        </span>
                        <h1 className="text-6xl md:text-7xl font-serif leading-[1.1] mb-12 tracking-tighter">
                            {recipe.name}
                        </h1>

                        <div className="grid grid-cols-3 gap-4 py-8 border-y border-[#E0E7FF] mb-12 bg-[#F3E8FF]/30 px-6 ">
                            <div><span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">Prep</span><span className="font-serif italic text-lg">{recipe.prepTime}</span></div>
                            <div><span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">Bake</span><span className="font-serif italic text-lg">{recipe.cookTime}</span></div>
                            <div><span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">Yield</span><span className="font-serif italic text-lg">{multiplier > 1 ? parseInt(recipe.servings) * multiplier : recipe.servings}</span></div>
                        </div>

                        <div className="flex justify-between items-end mb-10">
                            <h2 className="text-2xl font-serif italic opacity-40">ingredients</h2>
                            <div className="flex bg-white border border-[#E0E7FF] p-1 rounded-full">
                                {[1, 2].map(m => (
                                    <button key={m} onClick={() => setMultiplier(m)} className={`px-4 py-1 text-[9px] font-bold uppercase rounded-full transition-all ${multiplier === m ? 'bg-[#E0E7FF] text-[#6366F1]' : 'opacity-30'}`}>
                                        {m}x
                                    </button>
                                ))}
                            </div>
                        </div>
                        <ul className="space-y-5">
                            {recipe.ingredients.map((ing: any, i: number) => (
                                <li key={i} className="flex justify-between border-b border-[#E0E7FF]/50 pb-4 text-sm tracking-wide">
                                    <span className="opacity-70">{ing.item}</span>
                                    <span className="font-bold">{scaleAmount(ing.amount, multiplier)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="aspect-[16/11] bg-[#EBEBFF] rounded-[4rem] mb-20" />
                        <h2 className="text-2xl font-serif italic opacity-40 mb-12">directions</h2>
                        <div className="space-y-8">
                            {recipe.directions.map((step: string, i: number) => (
                                <div key={i} className="flex gap-8 group">
                                    <span className="flex-none w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[10px] font-bold text-[#6366F1]">
                                        {i + 1}
                                    </span>
                                    <p className="text-lg leading-[1.8] font-light opacity-80">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}