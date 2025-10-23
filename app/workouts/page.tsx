import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WorkoutPlanner from "./WorkoutPlanner"; 

export default async function Workouts() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  console.log("Token", token)

  if (!token) {
    // 🚨 Redirect to login page if user not authenticated
    redirect("/auth/login");
  }

  // ✅ If authenticated, render your planner
  return <WorkoutPlanner />;
}
