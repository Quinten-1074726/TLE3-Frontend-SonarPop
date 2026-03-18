import { useEffect, useMemo, useRef, useState } from "react";
import { getUserRole } from "../../auth/AuthStorage.js";
import {
  getBlacklistHistory,
  getGenreSliderHistory,
  getFeedbackHistory,
} from "../../services/history.js";

import BarChart from "../../components/charts/BarChart.jsx";
import LineChart from "../../components/charts/LineChart.jsx";
import DonutChart from "../../components/charts/DonutChart.jsx";

function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-[#181919] p-5">
      <p className="text-sm text-white/75">{title}</p>
      <p className="mt-3 text-3xl font-bold text-text-primary">{value}</p>
      {subtitle ? <p className="mt-2 text-xs text-white/70">{subtitle}</p> : null}
    </div>
  );
}

function Panel({ title, children, helper }) {
  return (
    <section className="rounded-2xl border border-white/12 bg-[#181919] p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        {helper ? <p className="mt-1 text-xs text-white/70">{helper}</p> : null}
      </div>
      {children}
    </section>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-dashed border-white/12 bg-white/[0.04] p-4 text-sm text-white/70">
      {text}
    </div>
  );
}

function EventListItem({ item }) {
  return (
    <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text-primary">{item.title}</p>
          <p className="mt-1 text-xs text-white/70">{item.description}</p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.15em] text-white/65">
            {item.source}
          </p>
          <p className="mt-1 text-xs text-white/75">
            {new Date(item.time).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

function normalizeHistoryResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function normalizeOperation(operation) {
  if (operation === "i") return "Added";
  if (operation === "u") return "Updated";
  if (operation === "r") return "Removed";
  return "Changed";
}

function getBlacklistCategory(entry) {
  return entry?.data?.type || "unknown";
}

function getFeedbackAction(entry) {
  return entry?.data?.action || "unknown";
}

function extractGenreCandidates(value) {
  if (!value) return [];

  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(extractGenreCandidates);
  }

  if (typeof value === "object") {
    return Object.entries(value).flatMap(([key, nested]) => {
      const collected = [];

      if (
        typeof nested === "number" ||
        typeof nested === "string" ||
        typeof nested === "boolean"
      ) {
        collected.push(key);
      }

      return [...collected, ...extractGenreCandidates(nested)];
    });
  }

  return [];
}

function getGenreNamesFromSliderHistory(entry) {
  const data = entry?.data;
  if (!data || typeof data !== "object") return [];

  const directCandidates = [
    data.genre,
    data.name,
    data.key,
    data.label,
    data.changedGenre,
  ].filter(Boolean);

  const nestedCandidates = [
    ...extractGenreCandidates(data.sliders),
    ...extractGenreCandidates(data.before),
    ...extractGenreCandidates(data.after),
    ...extractGenreCandidates(data.updated),
    ...extractGenreCandidates(data.changes),
    ...extractGenreCandidates(data.value),
  ];

  return [...directCandidates, ...nestedCandidates]
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => isNaN(Number(item)));
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function toSortedEntries(counter) {
  return Object.entries(counter).sort((a, b) => b[1] - a[1]);
}

function buildTimelineData(groups) {
  const allDates = new Set();

  Object.values(groups).forEach((entries) => {
    entries.forEach((entry) => {
      const date = new Date(entry.t || entry.time || Date.now())
        .toISOString()
        .slice(0, 10);
      allDates.add(date);
    });
  });

  const dates = Array.from(allDates).sort();

  const totals = dates.map((date) => {
    return Object.values(groups).reduce((sum, entries) => {
      const count = entries.filter((entry) => {
        const entryDate = new Date(entry.t || entry.time || Date.now())
          .toISOString()
          .slice(0, 10);
        return entryDate === date;
      }).length;

      return sum + count;
    }, 0);
  });

  return {
    labels: dates,
    values: totals,
  };
}

function buildRecentEvents(blacklistHistory, genreHistory, feedbackHistory) {
  const blacklistEvents = blacklistHistory.map((entry, index) => ({
    id: `blacklist-${index}-${entry.t || index}`,
    time: entry.t || new Date().toISOString(),
    source: "Blacklist",
    title: `${normalizeOperation(entry.o)} blacklist item`,
    description: `${entry?.data?.type || "Item"}: ${entry?.data?.value || "Unknown"}`,
  }));

  const genreEvents = genreHistory.map((entry, index) => {
    const genres = getGenreNamesFromSliderHistory(entry);

    return {
      id: `genre-${index}-${entry.t || index}`,
      time: entry.t || new Date().toISOString(),
      source: "Genre slider",
      title: `${normalizeOperation(entry.o)} genre slider`,
      description:
        genres.length > 0
          ? `Genres: ${genres.slice(0, 3).join(", ")}`
          : "Genre slider change recorded",
    };
  });

  const feedbackEvents = feedbackHistory.map((entry, index) => ({
    id: `feedback-${index}-${entry.t || index}`,
    time: entry.t || new Date().toISOString(),
    source: "Feedback",
    title: `${normalizeOperation(entry.o)} feedback event`,
    description: `Action: ${entry?.data?.action || "unknown"}${
      entry?.data?.trackId ? ` · Track: ${entry.data.trackId}` : ""
    }`,
  }));

  return [...blacklistEvents, ...genreEvents, ...feedbackEvents]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 10);
}

export default function BiasAnalysis() {
  const headingRef = useRef(null);
  const role = getUserRole();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [blacklistHistory, setBlacklistHistory] = useState([]);
  const [genreHistory, setGenreHistory] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    let active = true;

    async function loadHistory() {
      try {
        setLoading(true);
        setError("");

        const [blacklistResult, genreResult, feedbackResult] =
          await Promise.allSettled([
            getBlacklistHistory(),
            getGenreSliderHistory(),
            getFeedbackHistory(),
          ]);

        if (!active) return;

        console.log("Blacklist history result:", blacklistResult);
        console.log("Genre slider history result:", genreResult);
        console.log("Feedback history result:", feedbackResult);

        const blacklistData =
          blacklistResult.status === "fulfilled"
            ? normalizeHistoryResponse(blacklistResult.value)
            : [];

        const genreData =
          genreResult.status === "fulfilled"
            ? normalizeHistoryResponse(genreResult.value)
            : [];

        const feedbackData =
          feedbackResult.status === "fulfilled"
            ? normalizeHistoryResponse(feedbackResult.value)
            : [];

        console.log("Blacklist history data:", blacklistData);
        console.log("Genre slider history data:", genreData);
        console.log("Feedback history data:", feedbackData);

        setBlacklistHistory(blacklistData);
        setGenreHistory(genreData);
        setFeedbackHistory(feedbackData);

        const allFailed =
          blacklistResult.status === "rejected" &&
          genreResult.status === "rejected" &&
          feedbackResult.status === "rejected";

        if (allFailed) {
          setError("Could not load history data.");
        }
      } catch (err) {
        if (!active) return;
        console.error("Failed to load history data:", err);
        setError(err.message || "Could not load history data.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadHistory();

    return () => {
      active = false;
    };
  }, []);

  const totalEvents =
    blacklistHistory.length + genreHistory.length + feedbackHistory.length;

  const blacklistTypeCounts = useMemo(() => {
    return countBy(blacklistHistory, getBlacklistCategory);
  }, [blacklistHistory]);

  const feedbackActionCounts = useMemo(() => {
    return countBy(feedbackHistory, getFeedbackAction);
  }, [feedbackHistory]);

  const genreChangeCounts = useMemo(() => {
    const counter = {};

    genreHistory.forEach((entry) => {
      const genres = getGenreNamesFromSliderHistory(entry);
      genres.forEach((genre) => {
        counter[genre] = (counter[genre] || 0) + 1;
      });
    });

    return counter;
  }, [genreHistory]);

  const topBlacklistType = toSortedEntries(blacklistTypeCounts)[0]?.[0] || "—";
  const topFeedbackAction = toSortedEntries(feedbackActionCounts)[0]?.[0] || "—";
  const topChangedGenre = toSortedEntries(genreChangeCounts)[0]?.[0] || "—";

  const timelineData = useMemo(() => {
    return buildTimelineData({
      blacklist: blacklistHistory,
      genreslider: genreHistory,
      feedback: feedbackHistory,
    });
  }, [blacklistHistory, genreHistory, feedbackHistory]);

  const blacklistChartData = useMemo(() => {
    const sorted = toSortedEntries(blacklistTypeCounts).slice(0, 5);

    return {
      labels: sorted.map(([label]) => label),
      values: sorted.map(([, value]) => value),
    };
  }, [blacklistTypeCounts]);

  const feedbackChartData = useMemo(() => {
    const sorted = toSortedEntries(feedbackActionCounts).slice(0, 5);

    return {
      labels: sorted.map(([label]) => label),
      values: sorted.map(([, value]) => value),
    };
  }, [feedbackActionCounts]);

  const genreChartData = useMemo(() => {
    const sorted = toSortedEntries(genreChangeCounts).slice(0, 8);

    return {
      labels: sorted.map(([label]) => label),
      values: sorted.map(([, value]) => value),
    };
  }, [genreChangeCounts]);

  const recentEvents = useMemo(() => {
    return buildRecentEvents(blacklistHistory, genreHistory, feedbackHistory);
  }, [blacklistHistory, genreHistory, feedbackHistory]);

  const hasTimelineData = timelineData.labels.length > 0;
  const hasBlacklistData = blacklistChartData.values.some((value) => value > 0);
  const hasFeedbackData = feedbackChartData.values.some((value) => value > 0);
  const hasGenreData = genreChartData.values.some((value) => value > 0);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/12 bg-[#181919] p-5 text-text-primary">
        Loading bias and analysis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/65">
          SonarPoppy {role} dashboard
        </p>

        <h1
          ref={headingRef}
          tabIndex="-1"
          className="mt-2 text-4xl font-bold text-text-primary"
        >
          Bias & Analysis
        </h1>

        <p className="mt-3 text-sm text-white/75">
          Historical overview of blacklist changes, genre slider shifts, and
          feedback activity
        </p>
      </header>

      {error ? (
        <div
          className="mb-6 rounded-2xl border border-red-400/25 bg-red-500/12 p-4 text-sm text-red-200"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total history events"
          value={totalEvents || "—"}
          subtitle="Blacklist, genre slider, and feedback"
        />
        <StatCard
          title="Top changed genre"
          value={topChangedGenre}
          subtitle="Most frequent slider activity"
        />
        <StatCard
          title="Top blacklist type"
          value={topBlacklistType}
          subtitle="Artist, track, or genre"
        />
        <StatCard
          title="Top feedback action"
          value={topFeedbackAction}
          subtitle="Most common feedback event"
        />
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <Panel
          title="Activity over time"
          helper="Combined history volume per day"
        >
          {hasTimelineData ? (
            <LineChart
              labels={timelineData.labels}
              values={timelineData.values}
              chartLabel="History activity over time"
            />
          ) : (
            <EmptyState text="No history events available yet." />
          )}
        </Panel>

        <Panel
          title="Blacklist composition"
          helper="Most common blacklist item types"
        >
          {hasBlacklistData ? (
            <DonutChart
              labels={blacklistChartData.labels}
              values={blacklistChartData.values}
              chartLabel="Blacklist composition"
            />
          ) : (
            <EmptyState text="No blacklist history available yet." />
          )}
        </Panel>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel
          title="Most changed genres"
          helper="Based on genre slider history"
        >
          {hasGenreData ? (
            <BarChart
              labels={genreChartData.labels}
              values={genreChartData.values}
              chartLabel="Most changed genres"
            />
          ) : (
            <EmptyState text="No genre slider history available yet." />
          )}
        </Panel>

        <Panel
          title="Feedback distribution"
          helper="Distribution of feedback activity"
        >
          {hasFeedbackData ? (
            <BarChart
              labels={feedbackChartData.labels}
              values={feedbackChartData.values}
              chartLabel="Feedback distribution"
            />
          ) : (
            <EmptyState text="No feedback history available yet." />
          )}
        </Panel>
      </section>

      <section className="grid gap-4">
        <Panel
          title="Recent history"
          helper="Latest changes across all history sources"
        >
          {recentEvents.length > 0 ? (
            <div className="space-y-3">
              {recentEvents.map((item) => (
                <EventListItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState text="No recent changes available yet." />
          )}
        </Panel>
      </section>
    </div>
  );
}