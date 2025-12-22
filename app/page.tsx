import fs from "fs";
import path from "path";
import Link from "next/link";

const cardColors = ["bg-[#E0E7FF]", "bg-[#F3E8FF]", "bg-[#EBEBFF]"];

export default async function Home() {
  const recipesDir = path.join(process.cwd(), "data/recipes");

  if (!fs.existsSync(recipesDir)) {
    return <div className="p-20 text-center font-serif italic">Starting the oven... (Add recipes to /data/recipes)</div>;
  }

  const files = fs.readdirSync(recipesDir);
  const recipes = files.map((file) => {
    const filePath = path.join(recipesDir, file);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });

  return (
    <div className="min-h-screen">

      <header className="pt-60 pb-32 text-center px-6">
        <h1 className="text-7xl md:text-9xl font-serif leading-[0.85] tracking-tighter text-[#2D334A] mb-10">
          Pure <br />
          <span className="italic opacity-10">simplicity.</span>
        </h1>
        <p className="max-w-md mx-auto text-[10px] font-bold text-[#6366F1]/50 leading-relaxed uppercase tracking-[0.5em]">
          A curated kitchen journal
        </p>
      </header>

      <section className="max-w-md mx-auto px-6 mb-52">
        <div className="relative group">
          <input
            type="text"
            placeholder="search recipes"
            className="w-full bg-white border border-[#E0E7FF] rounded-full py-4 px-8 text-xs tracking-widest focus:ring-4 focus:ring-[#E0E7FF]/40 shadow-sm transition-all outline-none placeholder:text-[#2D334A]/30 text-[#2D334A]"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#6366F1]/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-12 mb-52">
        <div className="flex flex-col items-center mb-20 space-y-4">
          <h2 className="text-4xl font-serif italic text-[#2D334A]">latest from the kitchen</h2>
          <div className="w-12 h-[1px] bg-[#E0E7FF]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {recipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="group block"
            >
              <div className={`relative aspect-[16/10] overflow-hidden rounded-[2.5rem] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-2xl group-hover:shadow-[#6366F1]/20 group-hover:-translate-y-2 ${cardColors[index % cardColors.length]}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="mt-10 text-center px-4">
                <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#6366F1]/40 mb-3">
                  {recipe.category}
                </p>
                <h3 className="text-2xl font-serif text-[#2D334A] group-hover:italic transition-all duration-500">
                  {recipe.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-12 pb-52">
        <div className="flex flex-col items-center mb-16 space-y-3">
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#2D334A]/30">
            browse by category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["cookies", "cakes", "tarts"].map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="h-36 group relative overflow-hidden rounded-[2rem] bg-white border border-[#E0E7FF] flex flex-col items-center justify-center hover:shadow-xl hover:shadow-[#E0E7FF]/50 transition-all duration-500"
            >
              <h3 className="text-xl font-serif text-[#2D334A] group-hover:scale-110 transition-transform duration-700">
                {category}
              </h3>
              <div className="w-0 group-hover:w-6 h-[1px] bg-[#6366F1]/30 transition-all duration-500 mt-2" />
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}