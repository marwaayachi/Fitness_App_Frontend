"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/user/api";

export type User = {
  _id: string;
  name?: string;
  email: string;
  profile?: {
    age?: number;
    heightCm?: number;
    weightKg?: number;
    photoUrl?: string;
  };
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error(err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const handleSettings = async () => {
    // edit user information 
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user)
    return <p className="text-center mt-10">No user data available.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white shadow-lg rounded-r-3xl p-6 flex flex-col items-center">
        <div className="mb-6">
          <img
            src={user.profile?.photoUrl || "/default-avatar.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-md"
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">{user.name || "User"}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>

        <div className="w-full mt-4 space-y-2 text-gray-700">
          <p>Age: {user.profile?.age ?? "N/A"}</p>
          <p>Height: {user.profile?.heightCm ?? "N/A"} cm</p>
          <p>Weight: {user.profile?.weightKg ?? "N/A"} kg</p>
        </div>

        <button
          onClick={handleSettings}
          className="mt-8 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition"
        >
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative">
        <img
          src="/Brain.jpg"
          alt="Decorative"
          className="absolute bottom-10 right-10 w-48 h-48  pointer-events-none"
        />
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🏋️‍♀️ Your Workout Plans
        </h1>

        {/* Example workout plan section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Full Body Workout</h3>
            <p className="text-gray-600 mb-4">
              3 sets of push-ups, squats, and planks.
            </p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
              View Details
            </button>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Cardio Blast</h3>
            <p className="text-gray-600 mb-4">
              20 mins running, 15 mins cycling, 5 mins stretching.
            </p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
              View Details
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
