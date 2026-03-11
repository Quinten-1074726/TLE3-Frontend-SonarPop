import PageHeader from "../../components/ui/PageHeader.jsx";
import DonutChart from "../../components/charts/DonutChart.jsx";
import BarChart from "../../components/charts/BarChart.jsx";
import LineChart from "../../components/charts/LineChart.jsx";
import RadarChart from "../../components/charts/RadarChart.jsx";

const genreData = {
  labels: ["Pop", "Rock", "HipHop", "Jazz", "Other"],
  values: [45, 25, 15, 10, 5],
};

const artistData = {
  labels: ["Drake", "Taylor Swift", "Arctic Monkeys", "Billie Eilish", "Antoon"],
  values: [40, 35, 28, 22, 18],
};

const trendData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  values: [120, 190, 300, 250, 320, 410, 380],
};

const modelData = {
  labels: [
    "Genre Similarity",
    "Popularity",
    "User History",
    "Discovery",
    "Diversity",
  ],
  values: [0.7, 0.6, 0.8, 0.4, 0.5],
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
          <h2 className="h3 mb-4">Donut Chart (genre test)</h2>
          <DonutChart
            labels={genreData.labels}
            values={genreData.values}
            chartLabel="Genre distribution"
          />
        </section>

        <section className="grid grid-cols-1 gap-4">
          <div className="rounded-xl bg-disabled border border-white/10 p-4">
            <h3 className="text-text-primary font-semibold mb-4">
              Line Chart (recommendations test)
            </h3>

            <LineChart
              labels={trendData.labels}
              values={trendData.values}
              chartLabel="Recommendations over time"
            />
          </div>

          <div className="rounded-xl bg-disabled border border-white/10 p-4">
            <h3 className="text-text-primary font-semibold mb-4">
              Bar Chart (recommended artist test)
            </h3>
            <BarChart
              labels={artistData.labels}
              values={artistData.values}
              chartLabel="Top recommended artists"
            />
          </div>


          <section className="rounded-xl bg-disabled border border-white/10 p-4">
            <h2 className="h3 mb-4">AI Model Influence</h2>

            <RadarChart
              labels={modelData.labels}
              values={modelData.values}
              chartLabel="Recommendation Factors"
            />
          </section>
        </section>
      </div>
    </>
  );
}

export default Dashboard;