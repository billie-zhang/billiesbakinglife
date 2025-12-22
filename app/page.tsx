import fs from "fs";
import path from "path";
import Link from "next/link";

const cardColors = ["bg-[#E0E7FF]", "bg-[#F3E8FF]", "bg-[#EBEBFF]"];

export default async function Home() {
  const recipesDir = path.join(process.cwd(), "data/recipes");
  if (!fs.existsSync(recipesDir)) return <div className="p-20 text-center font-serif italic">Preheating...</div>;

  const files = fs.readdirSync(recipesDir);
  const recipes = files.map((file) => JSON.parse(fs.readFileSync(path.join(recipesDir, file), "utf-8")));

  // 1. Sort by Date for "Latest" (Assuming you add a "date": "2024-03-20" to your JSON)
  const latest = [...recipes]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 3);

  // 2. Explicit Featured Selection
  const featuredIds = ["butter-tarts", "kit-kat-bars", "carrot-cake-muffins"];
  const featured = featuredIds.map(id =>
    recipes.find(r => r.id === id) || recipes[0]
  );

  const categories = [
    { name: "cookies", color: "bg-[#E0E7FF]" },
    { name: "cakes", color: "bg-[#F3E8FF]" },
    { name: "bars/brownies", color: "bg-[#EBEBFF]" },
    { name: "tarts", color: "bg-[#E0E7FF]" },
    { name: "bread", color: "bg-[#F3E8FF]" },
    { name: "pastries", color: "bg-[#EBEBFF]" }
  ];

  return (
    <div className="min-h-screen">

      <section className="pt-40 md:pt-44 max-w-7xl mx-auto px-10 mb-40">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="text-3xl font-serif italic text-[#2D334A] whitespace-nowrap">Latest recipes</h2>
          <div className="w-full h-[1px] bg-[#D1DAFF]/90" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {latest.map((recipe, index) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group block">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-8 transition-all duration-1000 group-hover:-translate-y-2 ${cardColors[index % cardColors.length]}`} />
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#6366F1]/40 mb-2">
                  {recipe.date ? new Date(recipe.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'recently'} — {recipe.category}
                </p>
                <h3 className="text-2xl font-serif text-[#2D334A] transition-all duration-500">{recipe.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-10 mb-16 text-center">
        <span className="text-[18px] uppercase tracking-[0.75em] text-[#2D334A]/50 font-bold">The Ones Everyone Asks For</span>
      </div>

      <section className="px-8 md:px-20 mb-46">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 h-auto md:h-[600px]">
            <div className="md:col-span-7 h-[400px] md:h-full">
              <Link href={`/recipes/${featured[0]?.id}`} className="group relative block w-full h-full overflow-hidden rounded-[3.5rem] bg-[#E0E7FF] shadow-sm hover:shadow-xl transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D334A]/20 to-transparent z-10" />
                <div className="absolute bottom-12 left-12 z-20">
                  {/* <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/60 mb-3 block italic">The signature</span> */}
                  <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight transition-all">
                    {featured[0]?.name}
                  </h2>
                </div>
              </Link>
            </div>
            <div className="md:col-span-5 flex flex-col gap-10 md:gap-16 h-auto md:h-full">
              {featured.slice(1, 3).map((recipe, i) => (
                <Link key={recipe.id} href={`/recipes/${recipe.id}`} className={`group relative flex-1 min-h-[250px] overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-700 ${i === 0 ? 'bg-[#F3E8FF]' : 'bg-[#EBEBFF]'}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D334A]/10 to-transparent z-10" />
                  <div className="absolute bottom-10 left-10 z-20">
                    <h3 className="text-xl md:text-2xl font-serif text-white group-hover:italic transition-all">
                      {recipe.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F1F4FF] py-40 mb-48">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-7xl font-serif leading-tight tracking-tighter text-[#2D334A] mb-12">
            baking is <br /> <span className="italic opacity-20">the art of let go.</span>
          </h2>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="find your next bake"
              className="w-full bg-white rounded-full py-5 px-10 text-xs tracking-[0.2em] focus:ring-8 focus:ring-[#6366F1]/5 shadow-sm outline-none placeholder:text-[#2D334A]/30 text-[#2D334A]"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-10 mb-52">
        <div className="text-center mb-20">
          <h2 className="text-[14px] uppercase tracking-[0.6em] font-bold text-[#2D334A]/30">Explore by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/${cat.name}`}
              className="group flex flex-col h-64 overflow-hidden rounded-[2.5rem] bg-white border border-[#E0E7FF] transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366F1]/5 hover:-translate-y-1"
            >
              <div className={`h-1/2 w-full ${cat.color} transition-transform duration-700 group-hover:scale-105`} />

              <div className="h-1/2 w-full flex flex-col items-center justify-center bg-white relative">
                <h3 className="text-2xl font-serif text-[#2D334A] transition-all duration-500">
                  {cat.name}
                </h3>
                <div className="mt-2 h-[1px] w-0 bg-[#6366F1]/30 transition-all duration-500 group-hover:w-8" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-10 pb-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="aspect-[4/5] bg-[#E0E7FF] rounded-[4rem] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/10 to-transparent" />
          </div>
          <div className="space-y-8">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#6366F1]/40 ">The Maker</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#2D334A]">
              hi, i'm billie! <br /><span className="italic">welcome to my kitchen.</span>
            </h2>
            <p className="text-lg text-[#2D334A]/60 leading-relaxed font-light max-w-md">
              I believe that the best bakes come from a place of intuition, high-quality ingredients, and a lot of patience.
            </p>
            <Link href="/about" className="inline-block pt-6 group">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#2D334A] border-b border-[#2D334A] pb-1 group-hover:text-[#6366F1] group-hover:border-[#6366F1] transition-all">
                Read the full story
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}