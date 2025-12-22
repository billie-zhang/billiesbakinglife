import fs from "fs";
import path from "path";
import Link from "next/link";

const cardColors = ["bg-[#E8F0E6]", "bg-[#F5E6E8]", "bg-[#E6EBF0]"];

export default async function Home() {
  const recipesDir = path.join(process.cwd(), "data/recipes");

  if (!fs.existsSync(recipesDir)) {
    return <div className="p-20 text-center">Please add recipes to /data/recipes</div>;
  }

  const files = fs.readdirSync(recipesDir);
  const recipes = files.map((file) => {
    const filePath = path.join(recipesDir, file);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-800 selection:bg-rose-100 antialiased">

      <header className="pt-60 pb-32 text-center px-6">
        <h1 className="text-7xl md:text-8xl font-serif leading-[0.85] tracking-tighter text-slate-900 mb-10">
          Pure <br /> <span className="italic opacity-20">simplicity.</span>
        </h1>
        <p className="max-w-md mx-auto text-base font-light text-slate-400 leading-relaxed uppercase tracking-widest">
          A curated kitchen journal.
        </p>
      </header>

      <section className="max-w-md mx-auto px-6 mb-48">
        <div className="relative group">
          <input
            type="text"
            placeholder="search recipes"
            className="w-full bg-white border border-black/[0.05] rounded-full py-4 px-8 text-xs tracking-widest focus:ring-4 focus:ring-slate-200/50 shadow-sm transition-all outline-none placeholder:text-slate-400"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-12 mb-48">
        <div className="flex flex-col items-center mb-16 space-y-2">
          <h2 className="text-3xl font-serif italic text-slate-900">latest from the kitchen</h2>
          <div className="w-12 h-[1px] bg-black/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {recipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="group block"
            >
              <div className={`relative aspect-[16/10] overflow-hidden rounded-[2.5rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-xl group-hover:-translate-y-1 ${cardColors[index % cardColors.length]}`}>
                <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="mt-8 text-center px-4">
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-300 mb-2">
                  {recipe.category}
                </p>
                <h3 className="text-2xl font-serif group-hover:italic transition-all duration-300">
                  {recipe.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-12 pb-48">
        <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-slate-400 mb-16 text-center">
          browse by category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["cookies", "cakes", "tarts"].map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="h-32 group relative overflow-hidden rounded-3xl bg-white border border-black/[0.02] flex items-center justify-center hover:bg-slate-50 transition-all duration-500"
            >
              <h3 className="text-lg font-serif group-hover:italic transition-all duration-500">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}