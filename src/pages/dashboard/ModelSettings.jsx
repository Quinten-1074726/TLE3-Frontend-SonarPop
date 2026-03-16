import { useMemo, useState } from "react";
import RadarChart from "../../components/charts/RadarChart.jsx";

function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <h2 className="mb-4 text-xl font-semibold text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

function SettingRow({ label, value, onChange }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold text-text-primary">{label}</p>

        <div className="w-full lg:w-[260px]">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={onChange}
            className="w-full accent-white"
          />
          <p className="mt-2 text-right text-xs text-white/45">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function ModelSettings() {
  const [settings, setSettings] = useState({
    diversityBoost: 60,
    popularityWeight: 45,
    discoveryRate: 55,
    genreSimilarity: 70,
  });

  function updateSetting(key, value) {
    setSettings((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  }

  const radarData = useMemo(() => {
    return {
      labels: ["Diversity", "Popularity", "Discovery", "Similarity"],
      values: [
        settings.diversityBoost / 100,
        settings.popularityWeight / 100,
        settings.discoveryRate / 100,
        settings.genreSimilarity / 100,
      ],
    };
  }, [settings]);

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPoppy admin dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Model Settings</h1>
        <p className="mt-3 text-sm text-white/60">Recommendation tuning</p>
      </header>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Panel title="Tuning">
          <div className="space-y-4">
            <SettingRow
              label="Diversity boost"
              value={settings.diversityBoost}
              onChange={(e) => updateSetting("diversityBoost", e.target.value)}
            />

            <SettingRow
              label="Popularity weight"
              value={settings.popularityWeight}
              onChange={(e) => updateSetting("popularityWeight", e.target.value)}
            />

            <SettingRow
              label="Discovery rate"
              value={settings.discoveryRate}
              onChange={(e) => updateSetting("discoveryRate", e.target.value)}
            />

            <SettingRow
              label="Genre similarity"
              value={settings.genreSimilarity}
              onChange={(e) => updateSetting("genreSimilarity", e.target.value)}
            />
          </div>
        </Panel>

        <Panel title="Model profile">
          <RadarChart
            labels={radarData.labels}
            values={radarData.values}
            chartLabel="Model profile"
          />
        </Panel>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <button className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/15">
          Wijzigingen opslaan
        </button>

        <button className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 transition hover:bg-white/8 hover:text-white">
          Reset
        </button>
      </section>
    </div>
  );
}