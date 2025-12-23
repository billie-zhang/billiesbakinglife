import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from 'next/image';
import SearchSection from "@/components/SearchSection";

const cardColors = ["bg-[#E0E7FF]", "bg-[#F3E8FF]", "bg-[#EBEBFF]"];

export default async function Home() {
  const recipesDir = path.join(process.cwd(), "data/recipes");
  if (!fs.existsSync(recipesDir)) return <div className="p-20 text-center font-serif italic">preheating...</div>;

  const files = fs.readdirSync(recipesDir);
  const recipes = files.map((file) => JSON.parse(fs.readFileSync(path.join(recipesDir, file), "utf-8")));

  const latest = [...recipes]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 3);

  const featuredIds = ["butter-tarts", "kit-kat-cookie-bars", "carrot-cake-muffins"];
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

      <section className="pt-44 md:pt-52 max-w-7xl mx-auto px-10 mb-40">
        <div className="flex items-center gap-8 mb-20">
          <h2 className="text-2xl font-serif italic text-[#2D334A] whitespace-nowrap">latest recipes</h2>
          <div className="w-full h-[1px] bg-[#D1DAFF]/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {latest.map((recipe, index) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6 shadow-sm">
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-full ${cardColors[index % cardColors.length]}`} />
                )}
              </div>
              <div className="text-center px-4">
                <h3 className="text-[11px] mx-10 uppercase tracking-[0.35em] leading-relaxed text-[#2D334A]/80 transition-all duration-500 group-hover:text-[#2D334A]">
                  {recipe.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-10 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif italic text-[#2D334A]/30">everyone's favorites</h2>
      </div>

      <section className="px-8 md:px-20 mb-52">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[580px]">
            <div className="md:col-span-7 h-[380px] md:h-full">
              <Link href={`/recipes/${featured[0]?.id}`} className="group relative block w-full h-full overflow-hidden rounded-[3rem] bg-[#E0E7FF] shadow-sm hover:shadow-xl transition-all duration-700">
                {featured[0]?.image ? (
                  <>
                    <Image
                      src={featured[0].image}
                      alt={featured[0].name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D334A]/40 to-transparent z-10" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D334A]/30 to-transparent z-10" />
                )}

                <div className="absolute bottom-10 left-10 z-20">
                  <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-white leading-tight">
                    {featured[0]?.name}
                  </h2>
                </div>
              </Link>
            </div>

            <div className="md:col-span-5 flex flex-col gap-8 h-auto md:h-full">
              {featured.slice(1, 3).map((recipe, i) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className={`group relative flex-1 min-h-[220px] overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-700 ${i === 0 ? 'bg-[#F3E8FF]' : 'bg-[#EBEBFF]'}`}
                >
                  {recipe.image ? (
                    <>
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D334A]/30 to-transparent z-10" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D334A]/20 to-transparent z-10" />
                  )}

                  <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-white transition-all">
                      {recipe.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      <SearchSection recipes={recipes} />

      <section className="max-w-7xl mx-auto px-10 mb-60">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-serif italic text-[#2D334A]/40">explore by category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/${cat.name}`}
              className="group flex flex-col h-72 overflow-hidden rounded-[2.5rem] bg-white border border-[#E0E7FF] transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366F1]/5 hover:-translate-y-1"
            >
              <div className={`h-3/5 w-full ${cat.color} transition-transform duration-700 group-hover:scale-105`} />
              <div className="h-2/5 w-full flex flex-col items-center justify-center bg-white">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#2D334A]/70 group-hover:text-[#2D334A] transition-all duration-500">
                  {cat.name}
                </h3>
                <div className="mt-2 h-[1px] w-0 bg-[#6366F1]/40 transition-all duration-500 group-hover:w-10" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-10 pb-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="aspect-[4/5] bg-[#E0E7FF] rounded-[3.5rem] overflow-hidden relative shadow-inner">
            <Image
              src="/images/billie-profile.jpg"
              alt="billie"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-10">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#6366F1]/40">the maker</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#2D334A]">
              hi, i'm billie! <br /><span className="italic">welcome to my kitchen.</span>
            </h2>
            <p className="text-md text-[#2D334A]/60 leading-relaxed font-light max-w-sm">
              this is a collection of my favorite things to bake. i believe the best recipes are the ones shared with people you love.
            </p>
            <Link href="/about" className="inline-block group">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#2D334A] border-b border-[#2D334A]/20 pb-1 group-hover:text-[#6366F1] group-hover:border-[#6366F1] transition-all">
                read the full story
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}