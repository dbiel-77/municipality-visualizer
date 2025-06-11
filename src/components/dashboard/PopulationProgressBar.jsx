export default function PopulationProgressBar({ data }) {
  const totalPop = data.reduce((sum, m) => sum + m.population, 0);
  const completePop = data
    .filter(m => m.status === 'complete')
    .reduce((sum, m) => sum + m.population, 0);
  const inProgressPop = data
    .filter(m => m.status === 'in_progress')
    .reduce((sum, m) => sum + m.population, 0);
  const notStartedPop = totalPop - completePop - inProgressPop;

  const percentComplete = (completePop / totalPop) * 100;
  const percentInProgress = (inProgressPop / totalPop) * 100;
  const percentNotStarted = 100 - percentComplete - percentInProgress;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-2">
      <div className="text-center text-lg font-semibold">
        {completePop.toLocaleString()} out of {totalPop.toLocaleString()} Canadians represented
      </div>
      <div className="flex h-6 w-full overflow-hidden rounded shadow-md">
        <div
          className="bg-green-500"
          style={{ width: `${percentComplete}%` }}
          title={`Represented: ${completePop.toLocaleString()}`}
        />
        <div
          className="bg-yellow-400"
          style={{ width: `${percentInProgress}%` }}
          title={`In Progress: ${inProgressPop.toLocaleString()}`}
        />
        <div
          className="bg-gray-600"
          style={{ width: `${percentNotStarted}%` }}
          title={`Not Represented: ${notStartedPop.toLocaleString()}`}
        />
      </div>
    </div>
  );
}
