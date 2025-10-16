"use client";
import { useState } from "react";
import { generateWorkoutPlan } from "../services/workoutService";

export default function WorkoutPlanner() {
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("beginner");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setPlan("");
    try {
      const data = await generateWorkoutPlan({ goal, experience });
      setPlan(data.plan || "No plan found");
    } catch (err: any) {
      setPlan(err.message || "Error generating plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🏋️‍♀️ AI Workout Planner</h1>

      <div className="bg-gray-800 p-6 rounded-2xl text-white w-full max-w-lg shadow-lg">
        <label className="block mb-2 text-lg font-semibold">Goal</label>
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Build muscle, lose weight"
          className="w-full p-3 rounded-lg text-white mb-4"
        />

        <label className="block mb-2 text-lg font-semibold">Experience</label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-3 rounded-lg text-white mb-4"
        >
          <option value="beginner" className="text-black">
            Beginner
          </option>
          <option value="intermediate" className="text-black">
            Intermediate
          </option>
          <option value="advanced" className="text-black">
            Advanced
          </option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </div>

      {plan && (
        <div className="mt-6 w-full max-w-2xl bg-gray-800 p-6 rounded-2xl whitespace-pre-line shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Your Plan:</h2>
          <p>{plan}</p>
        </div>
      )}
    </div>
  );
}

