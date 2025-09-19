import WorkoutLogger from "@/components/workoutLogger";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Today's Summary</h2>
        <p className="text-sm text-gray-600">No workouts logged today.</p>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Log</h2>
        <WorkoutLogger />
      </section>
    </div>
  );
}
