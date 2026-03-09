import PageHeader from "../../components/ui/PageHeader.jsx";
import DonutChart from "../../components/charts/DonutChart.jsx";

const genreData = {
  labels: ["Pop", "Rock", "HipHop", "Jazz", "Other"],
  values: [45, 25, 15, 10, 5],
};

function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" />

      <div className="px-6 pb-28 space-y-6">
        <section className="rounded-xl bg-disabled border border-white/10 p-4">
          <h2 className="h3 mb-2">Overview</h2>
          <p className="text-sm text-white/60">
            Voor nu tests van de charts
          </p>
        </section>

        <section className="rounded-xl bg-disabled border border-white/10 p-4">
          <h2 className="h3 mb-4">Donut Chart ( genre test)</h2>
          <DonutChart
            labels={genreData.labels}
            values={genreData.values}
            chartLabel="Genre distribution"
          />
        </section>

        <section className="grid grid-cols-1 gap-4">
          <div className="rounded-xl bg-disabled border border-white/10 p-4 min-h-32">
            <h3 className="text-text-primary font-semibold">Line Chart ( Recommendations test)</h3>
            <p className="mt-2 text-sm text-white/50">
              Line chart placeholder
            </p>
          </div>

          <div className="rounded-xl bg-disabled border border-white/10 p-4 min-h-32">
            <h3 className="text-text-primary font-semibold">Bar chart (recommanded artist test)</h3>
            <p className="mt-2 text-sm text-white/50">
              Bar chart placeholder
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;