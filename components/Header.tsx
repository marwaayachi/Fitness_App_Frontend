import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <span className="font-bold text-xl">Fitness</span>
        </Link>
        <nav className="space-x-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/plans" className="hover:underline">
            Plans
          </Link>
          <Link href="/workouts" className="hover:underline">
            Workouts
          </Link>
          <Link href="/auth/login" className="ml-3 px-3 py-1 rounded border">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
