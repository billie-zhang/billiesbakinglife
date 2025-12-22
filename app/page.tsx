import fs from "fs";
import path from "path";
import Link from "next/link";

export default async function Home() {
  const recipesDir = path.join(process.cwd(), "data/recipes");
  const files = fs.readdirSync(recipesDir);

  const recipes = files.map((file) => {
    const filePath = path.join(recipesDir, file);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-100">

      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight">billie's baking life</span>
          <div className="flex gap-8 text-sm font-medium text-slate-600">
            <Link href="/cookies" className="hover:text-blue-600 transition">Cookies</Link>
            <Link href="/cakes" className="hover:text-blue-600 transition">Cakes</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          </div>
        </div>
      </nav>

      <header className="pt-40 pb-20 text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-6">
          baking, <span className="text-blue-600">simplified.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-500 font-light leading-relaxed">
          a curated collection of modern recipes designed for the home baker who values precision and style.
        </p>
      </header>

      {/* Search */}
      <section className="max-w-2xl mx-auto px-6 mb-24">
        <div className="relative group">
          <input
            type="text"
            placeholder="search recipes"
            className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 text-lg focus:ring-2 focus:ring-blue-500/20 transition-all outline-none placeholder:text-slate-400"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Carousel - "The Gallery" */}
      <section className="mb-32">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end mb-8">
          <div>
            <h2 className="text-sm uppercase tracking-[0.2em] text-blue-600 font-bold mb-2">Featured</h2>
            <p className="text-3xl font-semibold tracking-tight">latest from the kitchen</p>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-12 px-[10%] no-scrollbar snap-x">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="flex-none w-[350px] snap-center group"
            >
              <div className="relative h-[450px] w-full overflow-hidden rounded-[2rem] bg-slate-100 transition-transform duration-500 ease-out group-hover:scale-[0.98]">
                {/* Placeholder for high-end photography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-xs uppercase tracking-widest opacity-80 mb-2">{recipe.category}</p>
                  <h3 className="text-2xl font-bold leading-tight">{recipe.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Grid - Modern Minimalism */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["cookies", "cakes", "tarts"].map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="relative h-64 group overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 flex items-center justify-center hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold capitalize mb-1 group-hover:text-blue-600 transition">{category}</h3>
                <p className="text-slate-400 text-sm font-medium">View Collection</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-20 text-center">
        <p className="text-slate-400 text-sm font-medium">© 2025 Billie's Baking Life. Made with love 🩵.</p>
      </footer>
    </div>
  );
}