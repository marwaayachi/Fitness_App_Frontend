'use client';

import { useState } from "react";
import api from "@/lib/api";

export default function WorkoutLogger() {
    const [exercise, setExercise] = useState("");
    const [reps, setReps] = useState(8);
    const [sets, setSets] = useState(3);
    const [loading, setLoading] = useState(false);

    async function submit() {
        setLoading(true);
        try{
            const payload = {
              date: new Date().toISOString(),
              exercises: [
                {
                  name: exercise,
                  sets: Array.from({ length: sets }).map(() => ({
                    reps,
                    weightkg: null,
                  })),
                },
              ],
            };

            const { data } = await api.post('/workouts', payload);
            console.log(data);
            alert('Workout logged');
            setExercise("");
        } catch(err) {
            console.error(err);
            alert("Failed to log workout");
        } finally {
            setLoading(false);
        }      
    }

    return (
      <div className="space-y-3">
        <input
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="Exercise (e.g. Push-ups)"
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            className="p-2 border rounded w-24"
          />
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className="p-2 border rounded w-24"
          />
          <button
            onClick={submit}
            disabled={loading}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded"
          >
            Log
          </button>
        </div>
      </div>
    );
}
