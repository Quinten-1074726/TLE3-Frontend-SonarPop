import { useEffect, useMemo, useState } from "react";

import BarChart from "../../components/charts/BarChart.jsx";
import DonutChart from "../../components/charts/DonutChart.jsx";
import { getDashboardBootstrap } from "../../services/dashboard.js";
import { getUserRole } from "../../auth/AuthStorage.js";

function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-3 text-3xl font-bold text-text-primary">{value}</p>
      {subtitle ? <p className="mt-2 text-xs text-white/45">{subtitle}</p> : null}
    </div>
  );
}

function Panel({ title, children, helper }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        {helper ? <p className="mt-1 text-xs text-white/45">{helper}</p> : null}
      </div>
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

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [bootstrapError, setBootstrapError] = useState("");

  const [genres, setGenres] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [dialPresets, setDialPresets] = useState([]);

  const role = getUserRole();
  const isAdmin = role === "admin";

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setBootstrapError("");

        const bootstrap = await getDashboardBootstrap();
        if (!active) return;

        const normalizedGenres = Array.isArray(bootstrap?.genres?.items)
          ? bootstrap.genres.items
          : Array.isArray(bootstrap?.genres)
          ? bootstrap.genres
          : [];

        const normalizedTracks = Array.isArray(bootstrap?.tracks?.items)
          ? bootstrap.tracks.items
          : Array.isArray(bootstrap?.tracks)
          ? bootstrap.tracks
          : [];

        const normalizedDial = Array.isArray(bootstrap?.dial?.presets)
          ? bootstrap.dial.presets
          : Array.isArray(bootstrap?.dial)
          ? bootstrap.dial
          : [];

        setGenres(normalizedGenres);
        setTracks(normalizedTracks);
        setDialPresets(normalizedDial);

        const allFailed = !bootstrap?.genres && !bootstrap?.tracks && !bootstrap?.dial;
        if (allFailed) {
          setBootstrapError("Dashboarddata kon niet geladen worden.");
        }
      } catch (error) {
        if (!active) return;
        setBootstrapError("Dashboarddata kon niet geladen worden.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const totalTracks = tracks.length;
  const totalGenres = genres.length;
  const totalDialPresets = dialPresets.length;

  const genreDistribution = useMemo(() => {
    if (genres.length === 0 || tracks.length === 0) {
      return {
        labels: [],
        values: [],
        allValues: [],
      };
    }

    const sums = Array.from({ length: genres.length }, () => 0);

    tracks.forEach((track) => {
      const vector = Array.isArray(track.genreVector) ? track.genreVector : [];
      vector.forEach((value, index) => {
        if (typeof value === "number" && Number.isFinite(value)) {
          sums[index] += value;
        }
      });
    });

    const combined = genres.map((genre, index) => ({
      label: genre.name || genre.genre || `Genre ${index + 1}`,
      value: Number((sums[index] || 0).toFixed(2)),
    }));

    const sorted = combined
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);

    return {
      labels: sorted.slice(0, 5).map((item) => item.label),
      values: sorted.slice(0, 5).map((item) => item.value),
      allValues: sorted.map((item) => item.value),
    };
  }, [genres, tracks]);

  const dominantGenre = genreDistribution.labels[0] || "—";

  const catalogDiversityScore = useMemo(() => {
    const values = genreDistribution.allValues;
    const total = values.reduce((sum, value) => sum + value, 0);

    if (!total || values.length === 0) return null;

    const normalized = values.map((value) => value / total);
    const concentration = normalized.reduce((sum, value) => sum + value * value, 0);

    return Math.round(clamp((1 - concentration) * 100));
  }, [genreDistribution]);

  const topVsRestData = useMemo(() => {
    const values = genreDistribution.allValues;

    if (values.length === 0) {
      return {
        labels: ["Top 3 genres", "Overig"],
        values: [0, 0],
      };
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    if (!total) {
      return {
        labels: ["Top 3 genres", "Overig"],
        values: [0, 0],
      };
    }

    const topThree = values.slice(0, 3).reduce((sum, value) => sum + value, 0);
    const rest = Math.max(total - topThree, 0);

    return {
      labels: ["Top 3 genres", "Overig"],
      values: [Number(topThree.toFixed(2)), Number(rest.toFixed(2))],
    };
  }, [genreDistribution]);

  const hasGenreData = genreDistribution.labels.length > 0;
  const hasDonutData = topVsRestData.values.some((value) => value > 0);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#181919] p-5 text-text-primary">
        Dashboard laden...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPop {role} dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Overview</h1>
        <p className="mt-3 text-sm text-white/60">
          {isAdmin ? "Admin overview" : "Curator overview"}
        </p>
      </header>

      {bootstrapError ? (
        <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300">
          {bootstrapError}
        </div>
      ) : null}

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Tracks" value={totalTracks || "—"} subtitle="Catalogus" />
        <StatCard title="Genres" value={totalGenres || "—"} subtitle="Beschikbaar" />
        <StatCard
          title="Diversiteit"
          value={catalogDiversityScore !== null ? `${catalogDiversityScore}%` : "—"}
          subtitle="Catalogus"
        />
        <StatCard
          title="Dial presets"
          value={totalDialPresets || "—"}
          subtitle={dominantGenre !== "—" ? `Dominant: ${dominantGenre}` : "Model"}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Panel title="Genreprofiel">
          {hasGenreData ? (
            <BarChart
              labels={genreDistribution.labels}
              values={genreDistribution.values}
              chartLabel="Genreprofiel"
            />
          ) : (
            <EmptyState text="Nog geen chartdata beschikbaar." />
          )}
        </Panel>

        <Panel title="Concentratie">
          {hasDonutData ? (
            <DonutChart
              labels={topVsRestData.labels}
              values={topVsRestData.values}
              chartLabel="Concentratie"
            />
          ) : (
            <EmptyState text="Nog geen chartdata beschikbaar." />
          )}
        </Panel>
      </section>
    </div>
  );
}