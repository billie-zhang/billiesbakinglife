import fs from "fs";
import path from "path";
import Link from "next/link";

export default async function Home() {
  const recipesDir = path.join(process.cwd(), "data/recipes");
  const files = fs.readdirSync(recipesDir);

  const recipes = files.map((file) => {
    const filePath = path.join(recipesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data;
  });

  return (
    <div className="min-h-screen">
      <header className="text-center py-16">
        <h1 className="text-5xl font-light tracking-wide text-gray-900">
          Billie's Baking Life
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Simple recipes for the modern kitchen.
        </p>
      </header>

      {/* Carousel Section */}
      <section className="relative overflow-hidden max-w-6xl mx-auto px-6">
        <div className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="flex-none w-72 snap-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-200"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t-xl text-gray-400 text-sm">
                {/* You can replace this with a recipe image later */}
                No Image
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-800 mb-1 text-center">
                  {recipe.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <div className="flex justify-center my-12">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Highlights Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-light text-center mb-8 border-b-2 border-blue-500 pb-2 inline-block">
          Explore by Category
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["cookies", "cakes", "tarts"].map((category) => (
            <div
              key={category}
              className="p-6 border border-gray-200 rounded-xl text-center hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold capitalize mb-2">
                {category}
              </h3>
              <p className="text-gray-500 mb-4">
                Discover our {category} recipes
              </p>
              <Link
                href={`/${category}`}
                className="text-blue-600 font-medium hover:underline"
              >
                Browse →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
