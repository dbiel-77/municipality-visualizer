export default function MetricCard({ label, value, color }) {
  return (
    <div className={`p-4 rounded shadow text-center ${color}`}>
      <div className="text-sm">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
