import Card from "../../components/Card";

export default async function PlansPage() {
  // placeholder: later fetch from API
  const plans = [
    { id: "p1", title: "Beginner Full Body", difficulty: "Beginner" },
    { id: "p2", title: "4-Week Strength", difficulty: "Intermediate" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {plans.map((p) => (
        <Card key={p.id} title={p.title} subtitle={p.difficulty} />
      ))}
    </div>
  );
}
