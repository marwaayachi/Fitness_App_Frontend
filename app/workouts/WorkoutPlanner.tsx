"use client";
import { useState } from "react";
import { Dumbbell, Loader2 } from "lucide-react";
import { generateWorkoutPlan } from "../services/workoutService";

export default function WorkoutPlanner() {
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("beginner");
  const [intro, setIntro] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const cleanText = (text: string) => {
    return text
      .replace(/[*#_`>~]/g, "") // Remove markdown symbols
      .replace(/\n{2,}/g, "\n") // Reduce multiple newlines
      .trim();
  };

  

  const handleGenerate = async () => {
    setLoading(true);
    setIntro("");
    setDays([]);
    setConclusion("");

    try {
      const response = await generateWorkoutPlan({ goal, experience });
      console.log("API response:", response.plan);
      console.log("Plan type:", typeof response.plan); 
       
      const planText = response.plan;
      const fullText = cleanText(planText);
       
      const parts = fullText.split(/(?=Day\s*\d+)/i);
      const introText = parts[0].trim();
      const conclusionMatch = fullText.match(
        /(Conclusion|Summary|Final Thoughts)[:\s]*(.*)$/
      );

      // Extract day sections (exclude conclusion)
      const daySections = parts
        .slice(1)
        .map((section: string) => cleanText(section.trim()))
        .filter(
          (p: string) => !p.toLowerCase().includes("conclusion") && p.length > 0
        );

      setIntro(introText);
      setDays(daySections);
      if (conclusionMatch) {
        setConclusion(cleanText(conclusionMatch[0]));
      }
    } catch (err) {
      console.error(err);
      setIntro("Error generating plan.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col lg:flex-row items-start justify-center p-10 gap-10 bg-[url('/workbg.jpg')] bg-cover bg-center bg-fixed">
      {/* Left Section */}
      <div className="lg:sticky lg:top-42 self-start bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md h-fit">
        <div className="flex items-center gap-2 mb-6">
          <Dumbbell className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold">Workout Planner</h1>
        </div>

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Generating...
            </>
          ) : (
            "Generate Plan"
          )}
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full max-w-2xl flex flex-col gap-6 overflow-y-auto lg:max-h-screen pr-2">
        {/* Introduction Card */}
        {intro && (
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-3 text-center text-blue-400">
              🧠 Introduction
            </h2>
            <p className="text-gray-200 whitespace-pre-line leading-relaxed">
              {intro}
            </p>
          </div>
        )}

        {/* Daily Plan Cards */}
        {days.length > 0 && (
          <div className="flex flex-col gap-4">
            {days.map((day, idx) => {
              const dayTitle =
                day.match(/Day\s*\d+.*/i)?.[0] || `Day ${idx + 1}`;
              const weekDay = weekDays[idx % 7];
              const dayContent = day.replace(/Day\s*\d+.*/i, "").trim();

              return (
                <div
                  key={idx}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition"
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">
                    {weekDay} — {dayTitle}
                  </h3>
                  <p className="whitespace-pre-line text-gray-200 leading-relaxed">
                    {dayContent}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Conclusion Card */}
        {conclusion && (
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-3 text-center text-green-400">
              🏁 Conclusion
            </h2>
            <p className="text-gray-200 whitespace-pre-line leading-relaxed">
              {conclusion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
