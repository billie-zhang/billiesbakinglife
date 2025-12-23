'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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
                console.error(e);
            } finally {
                setIsLoading(false);
            }
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
        <div className="pt-48 pb-40 px-8 bg-[#F9FAFF]">
            <main className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

                    <div className="lg:col-span-5">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#E0E7FF] text-[#6366F1] text-[10px] uppercase font-bold tracking-widest mb-8">
                            {recipe.category}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-12 tracking-tighter text-[#2D334A]">
                            {recipe.name}
                        </h1>

                        <div className="grid grid-cols-3 gap-4 py-8 border-y border-[#E0E7FF]/60 mb-12 bg-white/50 rounded-2xl px-6">
                            <div><span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">prep</span><span className="font-serif italic text-lg text-[#2D334A]">{recipe.prepTime}</span></div>
                            <div><span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">bake</span><span className="font-serif italic text-lg text-[#2D334A]">{recipe.cookTime}</span></div>
                            <div><span className="block text-[9px] uppercase tracking-widest opacity-40 mb-1">yield</span><span className="font-serif italic text-lg text-[#2D334A]">{multiplier > 1 ? parseInt(recipe.servings) * multiplier : recipe.servings}</span></div>
                        </div>

                        <div className="flex justify-between items-end mb-10">
                            <h2 className="text-2xl font-serif italic opacity-30 text-[#2D334A]">ingredients</h2>
                            <div className="flex bg-white border border-[#E0E7FF] p-1 rounded-full shadow-sm">
                                {[1, 2].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => setMultiplier(m)}
                                        className={`px-4 py-1 text-[9px] font-bold uppercase rounded-full transition-all ${multiplier === m ? 'bg-[#E0E7FF] text-[#6366F1]' : 'opacity-30'}`}
                                    >
                                        {m}x
                                    </button>
                                ))}
                            </div>
                        </div>
                        <ul className="space-y-5">
                            {recipe.ingredients.map((ing: any, i: number) => (
                                <li key={i} className="flex justify-between border-b border-[#E0E7FF]/50 pb-4 text-[13px] tracking-wide text-[#2D334A]">
                                    <span className="opacity-60">{ing.item}</span>
                                    <span className="font-bold">{scaleAmount(ing.amount, multiplier)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="relative aspect-[16/11] bg-[#EBEBFF] rounded-[3.5rem] overflow-hidden mb-20 shadow-xl shadow-indigo-100/50">
                            {recipe.image ? (
                                <Image
                                    src={recipe.image}
                                    alt={recipe.name}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#EBEBFF] to-[#F3E8FF]" />
                            )}
                        </div>

                        <h2 className="text-2xl font-serif italic opacity-30 mb-12 text-[#2D334A]">directions</h2>
                        <div className="space-y-10">
                            {recipe.directions.map((step: string, i: number) => (
                                <div key={i} className="flex gap-8 group">
                                    <span className="flex-none w-8 h-8 rounded-full bg-white border border-[#E0E7FF] flex items-center justify-center text-[10px] font-bold text-[#6366F1] shadow-sm">
                                        {i + 1}
                                    </span>
                                    <p className="text-lg leading-[1.8] font-light text-[#2D334A]/90 lowercase">{step}</p>
                                </div>
                            ))}
                        </div>

                        {recipe.notes && (
                            <div className="mt-20 p-10 bg-white border border-[#E0E7FF] rounded-[2.5rem] border-solid">
                                <span className="text-[9px] uppercase tracking-widest font-bold text-[#6366F1]/50 mb-4 block">notes from billie</span>
                                <p className="font-serif italic text-lg text-[#2D334A]/70">{recipe.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}