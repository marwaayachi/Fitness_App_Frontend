export default function Card({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
