import { useEffect, useMemo, useState } from "react";

import DonutChart from "../../components/charts/DonutChart.jsx";
import BarChart from "../../components/charts/BarChart.jsx";
import LineChart from "../../components/charts/LineChart.jsx";
import RadarChart from "../../components/charts/RadarChart.jsx";

import * as dashboardService from "../../services/dashboard.js";

console.log(dashboardService);

import { getUserRole } from "../../auth/AuthStorage.js";

function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#181919] p-4 shadow-sm">
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-2 text-3xl font-bold text-text-primary">{value}</p>
      {subtitle ? (
        <p className="mt-2 text-xs text-white/45">{subtitle}</p>
      ) : null}
    </div>
  );
}

function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [genres, setGenres] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [dial, setDial] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [blacklist, setBlacklist] = useState([]);

  const role = getUserRole();

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [bootstrap, feedbackData, blacklistData] = await Promise.all([
          getDashboardBootstrap(),
          getFeedbackList().catch(() => []),
          getBlacklist().catch(() => []),
        ]);

        if (!isMounted) return;

        setGenres(
          Array.isArray(bootstrap?.genres?.items)
            ? bootstrap.genres.items
            : Array.isArray(bootstrap?.genres)
            ? bootstrap.genres
            : []
        );

        setTracks(
          Array.isArray(bootstrap?.tracks?.items)
            ? bootstrap.tracks.items
            : Array.isArray(bootstrap?.tracks)
            ? bootstrap.tracks
            : []
        );

        setDial(
          Array.isArray(bootstrap?.dial?.positions)
            ? bootstrap.dial.positions
            : Array.isArray(bootstrap?.dial)
            ? bootstrap.dial
            : bootstrap?.dial || null
        );

        setFeedback(
          Array.isArray(feedbackData?.items)
            ? feedbackData.items
            : Array.isArray(feedbackData?.entries)
            ? feedbackData.entries
            : Array.isArray(feedbackData)
            ? feedbackData
            : []
        );

        setBlacklist(
          Array.isArray(blacklistData?.entries)
            ? blacklistData.entries
            : Array.isArray(blacklistData?.items)
            ? blacklistData.items
            : Array.isArray(blacklistData)
            ? blacklistData
            : []
        );
      } catch (err) {
        console.error("Failed to load dashboard:", err);

        if (!isMounted) return;
        setError("Dashboard data kon niet geladen worden.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const genreChartData = useMemo(() => {
    if (genres.length > 0) {
      return {
        labels: genres.slice(0, 5).map((genre) => genre.name || genre.genre || "Unknown"),
        values: genres.slice(0, 5).map((_, index) => Math.max(5 - index, 1)),
      };
    }

    return {
      labels: ["Pop", "Rock", "HipHop", "Jazz", "Other"],
      values: [45, 25, 15, 10, 5],
    };
  }, [genres]);

  const tracksBarData = useMemo(() => {
    if (tracks.length > 0) {
      const labels = tracks.slice(0, 5).map((track, index) => {
        return track.title || track.name || `Track ${index + 1}`;
      });

      const values = tracks.slice(0, 5).map((track, index) => {
        return track.playCount || track.popularity || 10 - index;
      });

      return { labels, values };
    }

    return {
      labels: ["Track A", "Track B", "Track C", "Track D", "Track E"],
      values: [40, 35, 28, 22, 18],
    };
  }, [tracks]);

  const feedbackTrendData = useMemo(() => {
    if (feedback.length > 0) {
      const likeCount = feedback.filter((item) => item.action === "like").length;
      const dislikeCount = feedback.filter((item) => item.action === "dislike").length;
      const skipCount = feedback.filter((item) => item.action === "skip").length;

      return {
        labels: ["Likes", "Dislikes", "Skips"],
        values: [likeCount, dislikeCount, skipCount],
      };
    }

    return {
      labels: ["Likes", "Dislikes", "Skips"],
      values: [18, 6, 11],
    };
  }, [feedback]);

  const radarData = useMemo(() => {
    if (dial && typeof dial === "object" && !Array.isArray(dial)) {
      const entries = Object.entries(dial).slice(0, 5);

      if (entries.length > 0) {
        return {
          labels: entries.map(([key]) => key),
          values: entries.map(([, value]) =>
            typeof value === "number" ? value : 0.5
          ),
        };
      }
    }

    if (Array.isArray(dial) && dial.length > 0) {
      return {
        labels: dial.slice(0, 5).map((_, index) => `Dial ${index + 1}`),
        values: dial.slice(0, 5).map((value) =>
          typeof value === "number" ? value : 0.5
        ),
      };
    }

    return {
      labels: ["Similarity", "Popularity", "History", "Discovery", "Diversity"],
      values: [0.7, 0.6, 0.8, 0.4, 0.5],
    };
  }, [dial]);

  const totalTracks = tracks.length;
  const totalGenres = genres.length;
  const totalFeedback = feedback.length;
  const totalBlacklist = blacklist.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111315] text-text-primary p-6">
        <p className="text-white/70">Dashboard laden...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#111315] text-text-primary p-6">
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPoppy {role} dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold">Dashboard overview</h1>
        <p className="mt-2 max-w-3xl text-sm text-white/65">
          Eerste versie van het admin/curator dashboard met gekoppelde backend-data
          waar beschikbaar, en fallback-data voor visualisatie.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <StatCard
          title="Tracks"
          value={totalTracks}
          subtitle="Beschikbare tracks in huidige response"
        />
        <StatCard
          title="Genres"
          value={totalGenres}
          subtitle="Genres opgehaald vanuit backend"
        />
        <StatCard
          title="Feedback items"
          value={totalFeedback}
          subtitle="Likes, dislikes en skips"
        />
        <StatCard
          title="Blacklist entries"
          value={totalBlacklist}
          subtitle="Geblokkeerde tracks, artists of genres"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-2 mb-6">
        <div className="rounded-2xl border border-white/10 bg-[#181919] p-4">
          <h2 className="mb-4 text-lg font-semibold">Genre distribution</h2>
          <DonutChart
            labels={genreChartData.labels}
            values={genreChartData.values}
            chartLabel="Genres"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#181919] p-4">
          <h2 className="mb-4 text-lg font-semibold">Feedback overview</h2>
          <LineChart
            labels={feedbackTrendData.labels}
            values={feedbackTrendData.values}
            chartLabel="Feedback"
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#181919] p-4">
          <h2 className="mb-4 text-lg font-semibold">Track preview</h2>
          <BarChart
            labels={tracksBarData.labels}
            values={tracksBarData.values}
            chartLabel="Tracks"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#181919] p-4">
          <h2 className="mb-4 text-lg font-semibold">Dial / model influence</h2>
          <RadarChart
            labels={radarData.labels}
            values={radarData.values}
            chartLabel="Dial factors"
          />
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;