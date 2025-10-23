// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function ProfilePage() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token");

//   if (!token) {
//     redirect("/auth/login"); // Redirect if not logged in
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">👋 Welcome to your profile</h1>
//       <form action="auth/logout" method="POST">
//         <button
//           type="submit"
//           className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:4000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    router.push("/auth/login"); // redirect after logout
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👋 Welcome to your profile</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
