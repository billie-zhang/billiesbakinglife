import fs from "fs";
import path from "path";
import Link from "next/link";

const cardColors = ["bg-[#E0E7FF]", "bg-[#F3E8FF]", "bg-[#EBEBFF]"];

export default async function Home() {
  const recipesDir = path.join(process.cwd(), "data/recipes");
  if (!fs.existsSync(recipesDir)) return <div className="p-20 text-center font-serif italic">Preheating...</div>;

  const files = fs.readdirSync(recipesDir);
  const recipes = files.map((file) => JSON.parse(fs.readFileSync(path.join(recipesDir, file), "utf-8")));

  const featured = recipes.slice(0, 3);
  const latest = recipes.slice(3, 9);

  const categories = ["cookies", "cakes", "bars/brownies", "tarts", "bread", "pastries"]; // TODO: update categories

  return (
    <div className="min-h-screen">

      <section className="pt-40 md:pt-44 max-w-7xl mx-auto px-10 mb-40">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="text-3xl font-serif italic text-[#2D334A] whitespace-nowrap">Latest recipes</h2>
          <div className="w-full h-[1px] bg-[#D1DAFF]/90" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {latest.map((recipe, index) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group block text-center">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-8 transition-all duration-1000 group-hover:-translate-y-2 ${cardColors[index % cardColors.length]}`} />
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#6366F1]/30 mb-3">{recipe.category}</p>
              <h3 className="text-2xl font-serif text-[#2D334A] group-hover:italic transition-all duration-500">{recipe.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-8 md:px-20 mb-52">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 h-auto md:h-[550px]">
            <div className="md:col-span-7 h-[350px] md:h-full">
              <Link href={`/recipes/${featured[0]?.id}`} className="group relative block w-full h-full overflow-hidden rounded-[3.5rem] bg-[#E0E7FF] shadow-sm hover:shadow-xl transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D334A]/20 to-transparent z-10" />
                <div className="absolute bottom-12 left-12 z-20">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#2D334A]/40 mb-3 block">Featured Recipe</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-[#2D334A] leading-tight group-hover:italic transition-all">
                    {featured[0]?.name}
                  </h2>
                </div>
              </Link>
            </div>
            <div className="md:col-span-5 flex flex-col gap-10 md:gap-16 h-auto md:h-full">
              {featured.slice(1, 3).map((recipe, i) => (
                <Link key={recipe.id} href={`/recipes/${recipe.id}`} className={`group relative flex-1 min-h-[220px] overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-700 ${i === 0 ? 'bg-[#F3E8FF]' : 'bg-[#EBEBFF]'}`}>
                  <div className="absolute bottom-10 left-10 z-20">
                    <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#2D334A]/30 mb-2">{recipe.category}</p>
                    <h3 className="text-xl md:text-2xl font-serif text-[#2D334A] group-hover:italic transition-all">
                      {recipe.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F1F4FF] py-40 mb-52">
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

      <section className="max-w-7xl mx-auto px-10 pb-56">
        <div className="text-center mb-20">
          <h2 className="text-[12px] uppercase tracking-[0.6em] font-bold text-[#2D334A]/30">Explore by Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="group relative flex flex-col items-center justify-center h-40 bg-white border border-[#E0E7FF] rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366F1]/5 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-serif text-[#2D334A] transition-all duration-500">
                {category}
              </h3>
              <div className="mt-3 h-[1.5px] w-0 bg-[#6366F1]/30 transition-all duration-500 ease-out group-hover:w-12" />
            </Link>
          ))}
        </div>
      </section>

      {/* TODO: update this section */}
      <section className="max-w-6xl mx-auto px-10 pb-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="aspect-[4/5] bg-[#E0E7FF] rounded-[4rem] overflow-hidden">
            {/* Placeholder for an About Image */}
            <div className="w-full h-full bg-gradient-to-tr from-[#6366F1]/10 to-transparent" />
          </div>
          <div className="space-y-8">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#6366F1]/40 ">The Maker</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#2D334A]">
              hi, i'm billie! <br /><span className="italic">welcome to my kitchen.</span>
            </h2>
            <p className="text-lg text-[#2D334A]/60 leading-relaxed font-light max-w-md">
              I believe that the best bakes come from a place of intuition, high-quality ingredients, and a lot of patience. This journal is where I share my most cherished recipes and the stories behind them.
            </p>
            <Link
              href="/about"
              className="inline-block pt-6 group"
            >
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