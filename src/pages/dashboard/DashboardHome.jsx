import { useEffect, useMemo, useState } from "react";
import { getUserRole } from "../../auth/AuthStorage.js";
import { getAdminConfig } from "../../services/admin.js";

import DonutChart from "../../components/charts/DonutChart.jsx";
import RadarChart from "../../components/charts/RadarChart.jsx";
import BarChart from "../../components/charts/BarChart.jsx";

function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-3 text-3xl font-bold text-text-primary">{value}</p>
      {subtitle ? <p className="mt-2 text-xs text-white/45">{subtitle}</p> : null}
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

function MiniSignal({ label, value }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-2 text-base font-semibold text-text-primary">{value}</p>
    </div>
  );
}

function normalizePercent(value, fallback = 50) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.round(value * 100);
}

function getSafeHybridValues(config) {
  const genre = normalizePercent(config?.hybridWeights?.genre, 50);
  const cf = normalizePercent(config?.hybridWeights?.cf, 50);

  if (genre + cf === 100) {
    return { genre, cf };
  }

  return {
    genre,
    cf: 100 - genre,
  };
}

function getMixLabel(genre, listeners) {
  if (genre >= 70) return "Genre-led";
  if (listeners >= 70) return "Listener-led";
  return "Balanced";
}

function getDiscoveryLabel(value) {
  if (value >= 120) return "High";
  if (value >= 95) return "Medium";
  return "Low";
}

function getLearningLabel(value) {
  if (value >= 50) return "High";
  if (value >= 20) return "Medium";
  return "Low";
}

export default function DashboardHome() {
  const role = getUserRole();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [configAvailable, setConfigAvailable] = useState(false);

  const [settings, setSettings] = useState({
    hybridGenre: 50,
    hybridCf: 50,

    feedbackLike: 110,
    feedbackDislike: 50,
    feedbackLibrary: 120,
    feedbackSkip: 90,

    cfTrackWeight: 70,
    cfArtistWeight: 30,

    learningRate: 10,
    maxShift: 30,
  });

  useEffect(() => {
    let active = true;

    async function loadConfig() {
      try {
        setLoading(true);
        setError("");

        const config = await getAdminConfig();
        if (!active) return;

        const safeHybrid = getSafeHybridValues(config);

        setSettings({
          hybridGenre: safeHybrid.genre,
          hybridCf: safeHybrid.cf,

          feedbackLike: normalizePercent(config?.feedbackMultipliers?.like, 110),
          feedbackDislike: normalizePercent(config?.feedbackMultipliers?.dislike, 50),
          feedbackLibrary: normalizePercent(config?.feedbackMultipliers?.library, 120),
          feedbackSkip: normalizePercent(config?.feedbackMultipliers?.skip, 90),

          cfTrackWeight: normalizePercent(
            config?.cfWeights?.trackWeight ?? config?.cfWeights?.track,
            70
          ),
          cfArtistWeight: normalizePercent(
            config?.cfWeights?.artistWeight ?? config?.cfWeights?.artist,
            30
          ),

          learningRate: normalizePercent(
            config?.profileEvolution?.learningRate ?? config?.profileEvolution?.like,
            10
          ),
          maxShift: normalizePercent(
            config?.profileEvolution?.maxShift ?? config?.profileEvolution?.library,
            30
          ),
        });

        setConfigAvailable(true);
      } catch (err) {
        if (!active) return;
        setConfigAvailable(false);
        setError(err.message || "Overview kon niet geladen worden.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadConfig();

    return () => {
      active = false;
    };
  }, []);

  const mixData = useMemo(() => {
    return {
      labels: ["Genre match", "Similar listeners"],
      values: [settings.hybridGenre, settings.hybridCf],
    };
  }, [settings]);

  const feedbackData = useMemo(() => {
    return {
      labels: ["Like", "Dislike", "Library", "Skip"],
      values: [
        settings.feedbackLike,
        settings.feedbackDislike,
        settings.feedbackLibrary,
        settings.feedbackSkip,
      ],
    };
  }, [settings]);

  const radarData = useMemo(() => {
    return {
      labels: ["Genre", "Listeners", "Discovery", "Learning", "Track", "Artist"],
      values: [
        settings.hybridGenre / 100,
        settings.hybridCf / 100,
        settings.feedbackLibrary / 200,
        settings.learningRate / 100,
        settings.cfTrackWeight / 100,
        settings.cfArtistWeight / 100,
      ],
    };
  }, [settings]);

  const mixLabel = getMixLabel(settings.hybridGenre, settings.hybridCf);
  const discoveryLabel = getDiscoveryLabel(settings.feedbackLibrary);
  const learningLabel = getLearningLabel(settings.learningRate);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#181919] p-5 text-text-primary">
        Overview laden...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPoppy {role} dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Overview</h1>
        <p className="mt-3 text-sm text-white/60">
          Current model and recommendation balance
        </p>
      </header>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {!configAvailable ? (
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#181919] p-5 text-sm text-white/60">
          De modelconfig is nog niet beschikbaar op deze backend.
        </div>
      ) : null}

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Genre match"
          value={configAvailable ? settings.hybridGenre : "—"}
          subtitle="Content-driven weight"
        />
        <StatCard
          title="Similar listeners"
          value={configAvailable ? settings.hybridCf : "—"}
          subtitle="Behavior-driven weight"
        />
        <StatCard
          title="Discovery level"
          value={configAvailable ? discoveryLabel : "—"}
          subtitle="Based on library boost"
        />
        <StatCard
          title="Learning level"
          value={configAvailable ? learningLabel : "—"}
          subtitle="Profile adaptation signal"
        />
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <Panel title="Model mix">
          {configAvailable ? (
            <DonutChart
              labels={mixData.labels}
              values={mixData.values}
              chartLabel="Model mix"
            />
          ) : (
            <EmptyState text="Nog geen modeldata beschikbaar." />
          )}
        </Panel>

        <Panel title="Model profile">
          {configAvailable ? (
            <RadarChart
              labels={radarData.labels}
              values={radarData.values}
              chartLabel="Model profile"
            />
          ) : (
            <EmptyState text="Nog geen profieldata beschikbaar." />
          )}
        </Panel>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Feedback impact">
          {configAvailable ? (
            <BarChart
              labels={feedbackData.labels}
              values={feedbackData.values}
              chartLabel="Feedback impact"
            />
          ) : (
            <EmptyState text="Nog geen feedbackdata beschikbaar." />
          )}
        </Panel>

        <Panel title="Current signals">
          <div className="space-y-3">
            <MiniSignal label="Mix focus" value={configAvailable ? mixLabel : "—"} />
            <MiniSignal
              label="Track similarity"
              value={configAvailable ? `${settings.cfTrackWeight}` : "—"}
            />
            <MiniSignal
              label="Artist similarity"
              value={configAvailable ? `${settings.cfArtistWeight}` : "—"}
            />
            <MiniSignal
              label="Profile learning"
              value={configAvailable ? learningLabel : "—"}
            />
          </div>
        </Panel>
      </section>
    </div>
  );
}