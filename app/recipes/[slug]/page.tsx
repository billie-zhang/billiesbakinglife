import { notFound } from 'next/navigation';

interface Ingredient {
    item: string;
    amount: string;
}

interface RecipeData {
    id: string;
    name: string;
    category: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    ingredients: Ingredient[];
    directions: string[];
    notes?: string;
}

// 2. Mock Data Fetching (In a real app, this would fetch ALL recipe files)
// For now, we will import only the one file we have.
// You will need to create a helper function to fetch dynamically later.
const RECIPES: RecipeData[] = [
    require('../../../data/recipes/butter-tarts.json'),
    // Add other imported recipe JSON files here
];


export default async function RecipePage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const recipe = RECIPES.find(r => r.id === slug);

    if (!recipe) {
        return notFound();
    }

    return (
        <div className="container mx-auto p-4 md:p-12 max-w-4xl min-h-screen bg-white">

            {/* Recipe Title & Metadata */}
            <header className="mb-10 pb-4 border-b-2 border-blue-500">
                <h1 className="text-4xl font-light text-gray-900 mb-2">{recipe.name}</h1>
                <p className="text-lg text-gray-600 capitalize">{recipe.category.replace('-', ' & ')}</p>
            </header>

            {/* Metadata Section */}
            <section className="flex justify-start space-x-8 mb-10 text-gray-700">
                <p><strong>Prep Time:</strong> <span className="text-blue-600">{recipe.prepTime}</span></p>
                <p><strong>Cook Time:</strong> <span className="text-blue-600">{recipe.cookTime}</span></p>
                <p><strong>Servings:</strong> <span className="text-blue-600">{recipe.servings}</span></p>
            </section>

            <div className="grid md:grid-cols-3 gap-12">

                {/* Ingredients List */}
                <section className="md:col-span-1">
                    <h2 className="text-2xl font-light mb-4 border-b pb-1 text-gray-800">Ingredients</h2>
                    <ul className="list-none space-y-2">
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index} className="flex justify-between border-b border-gray-100 pb-1 text-gray-700">
                                <span className="font-medium text-gray-900">{ing.item}</span>
                                <span className="text-right">{ing.amount}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Directions */}
                <section className="md:col-span-2">
                    <h2 className="text-2xl font-light mb-4 border-b pb-1 text-gray-800">Directions</h2>
                    <ol className="list-decimal list-inside space-y-4 text-lg">
                        {recipe.directions.map((step, index) => (
                            <li key={index} className="pl-2">
                                <span className="text-gray-700">{step}</span>
                            </li>
                        ))}
                    </ol>

                    {/* Notes */}
                    {recipe.notes && (
                        <div className="mt-8 p-4 border-l-4 border-blue-500 bg-blue-50 text-gray-700">
                            <p className="font-semibold text-blue-800 mb-1">Cook's Note:</p>
                            <p>{recipe.notes}</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}