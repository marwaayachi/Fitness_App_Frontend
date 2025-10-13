import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[url('/backg.jpg')] bg-cover bg-center">
      <main className="flex flex-col gap-[32px] row-start-2 text-white items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-4">Welcome to Cheebo Fitness</h1>
        <p className="mb-6">Track workouts, set goals, and follow plans.</p>

        {/* Buttons Group */}
        <div className="flex flex-col items-center sm:items-start space-y-3">
          {/* First row of buttons */}
          <div className="flex space-x-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded w-36 text-center"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/plans"
              className="px-4 py-2 border border-white rounded w-36 text-center"
            >
              Browse Plans
            </Link>
          </div>

          {/* Register button (same total width as above row) */}
          <Link
            href="/auth/register"
            className="block w-[18.5rem] bg-orange-500 text-white text-xl py-2 rounded text-center hover:bg-orange-600 transition"
          >
            Register
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-green-600 text-2xl">Hello I am the footer</p>
      </footer>
    </div>
  );
}
