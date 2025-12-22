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

      <header className="pt-52 pb-32 text-center px-6">
        <h1 className="text-7xl md:text-9xl font-serif leading-[0.85] tracking-tighter text-slate-900 mb-10">
          Pure <br /> <span className="italic opacity-20">simplicity.</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg font-light text-slate-500 leading-relaxed">
          Thoughtfully curated recipes for the modern home. <br />
        </p>
      </header>

      <section className="max-w-xl mx-auto px-6 mb-40">
        <div className="relative group">
          <input
            type="text"
            placeholder="search recipes"
            className="w-full bg-white border border-black/[0.05] rounded-full py-5 px-8 text-sm tracking-wide focus:ring-4 focus:ring-slate-200/50 shadow-sm transition-all outline-none placeholder:text-slate-400"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-8 mb-40">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-serif italic">latest from the kitchen</h2>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Scroll to explore</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {recipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="group block"
            >
              <div className={`relative aspect-[4/5] overflow-hidden rounded-[3rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-2xl group-hover:-translate-y-2 ${cardColors[index % cardColors.length]}`}>
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="mt-8 px-2">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">
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

      <section className="max-w-7xl mx-auto px-8 pb-40">
        <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-12 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["cookies", "cakes", "tarts"].map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="h-40 group relative overflow-hidden rounded-[2rem] bg-white border border-black/[0.03] flex items-center justify-center hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <h3 className="text-xl font-serif group-hover:scale-110 transition-transform duration-500">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}