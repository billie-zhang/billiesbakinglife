import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Billie's Baking Life | Home</title>
        <meta name="description" content="Simple, modern, and minimal recipes." />
      </Head>

      <div className="container mx-auto p-4 md:p-8 min-h-screen">

        <header className="py-10 text-center">
          <h1 className="text-5xl font-light tracking-wider text-gray-900">
            Billie's Baking Life
          </h1>
          <p className="mt-2 text-xl text-gray-500">
            Simple recipes for the modern kitchen.
          </p>
        </header>

        <nav className="my-12 flex justify-center space-x-6">
          <Link
            href="/cookies"
            className="text-lg text-gray-700 hover:text-blue-600 transition duration-150"
          >
            Cookies
          </Link>
          {/* Add more categories here later */}
          <Link
            href="/about"
            className="text-lg text-gray-700 hover:text-blue-600 transition duration-150"
          >
            About
          </Link>
        </nav>

        <div className="flex justify-center my-10">
          <input
            type="text"
            placeholder="Search recipes by name..."
            className="w-full max-w-lg p-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-light text-center mb-8 border-b-2 border-blue-500 pb-2 inline-block px-4">
            Latest Additions
          </h2>
          {/* This is where you'll loop through and display your recipes */}
          <p className="text-center text-gray-500">
            Recipe list coming soon!
          </p>
        </section>

      </div>
    </>
  );
}