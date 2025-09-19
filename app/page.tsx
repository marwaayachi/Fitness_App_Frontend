import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-4">Welcome to Cheebo Fitness</h1>
        <p className="mb-6">Track workouts, set goals, and follow plans.</p>
        <div className="space-x-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go to Dashboard
          </Link>
          <Link href="/plans" className="px-4 py-2 border rounded">
            Browse Plans
          </Link>
        </div>{" "}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-green-600 text-2xl">Hello i am the footer</p>
      </footer>
    </div>
  );
}
