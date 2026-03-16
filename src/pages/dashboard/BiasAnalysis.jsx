import { getUserRole } from "../../auth/AuthStorage.js";
import BarChart from "../../components/charts/BarChart.jsx";
import DonutChart from "../../components/charts/DonutChart.jsx";

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-3 text-3xl font-bold text-text-primary">{value}</p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <h2 className="mb-4 text-xl font-semibold text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-white/50">
      {text}
    </div>
  );
}

export default function BiasAnalysis() {
  const role = getUserRole();

  const distributionData = {
    labels: [],
    values: [],
  };

  const biasSplitData = {
    labels: ["Bias", "Neutraal"],
    values: [0, 0],
  };

  const hasDistributionData = distributionData.labels.length > 0;
  const hasBiasSplitData = biasSplitData.values.some((value) => value > 0);

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPoppy {role} dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Bias & Analysis</h1>
        <p className="mt-3 text-sm text-white/60">Recommendation output</p>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Bias score" value="—" />
        <StatCard title="Dominant genre" value="—" />
        <StatCard title="Discovery" value="—" />
        <StatCard title="Diversiteit" value="—" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Panel title="Recommendation distribution">
          {hasDistributionData ? (
            <BarChart
              labels={distributionData.labels}
              values={distributionData.values}
              chartLabel="Recommendation distribution"
            />
          ) : (
            <EmptyState text="Nog geen recommendation data beschikbaar." />
          )}
        </Panel>

        <Panel title="Bias split">
          {hasBiasSplitData ? (
            <DonutChart
              labels={biasSplitData.labels}
              values={biasSplitData.values}
              chartLabel="Bias split"
            />
          ) : (
            <EmptyState text="Nog geen bias data beschikbaar." />
          )}
        </Panel>
      </section>
    </div>
  );
}