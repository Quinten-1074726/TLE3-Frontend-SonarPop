import { useEffect, useMemo, useState } from "react";
import RadarChart from "../../components/charts/RadarChart.jsx";
import {
  getAdminConfig,
  updateAdminConfig,
  resetAdminConfig,
} from "../../services/admin.js";

function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <h2 className="mb-4 text-xl font-semibold text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

function SettingRow({ label, value, min = 0, max = 100, onChange, disabled = false }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold text-text-primary">{label}</p>

        <div className="w-full lg:w-[260px]">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full accent-white disabled:opacity-40"
          />
          <p className="mt-2 text-right text-xs text-white/45">{value}</p>
        </div>
      </div>
    </div>
  );
}

function normalizePercent(value, fallback = 50) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.round(value * 100);
}

function normalizeNumber(value, fallback = 0) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return value;
}

export default function ModelSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [configAvailable, setConfigAvailable] = useState(false);

  const [configMeta, setConfigMeta] = useState({
    updatedAt: "",
    updatedBy: "",
  });

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

    playThreshold: 10,
    halfLifeDays: 30,
  });

  function applyConfigToState(config) {
    setSettings({
      hybridGenre: normalizePercent(config?.hybridWeights?.genre, 50),
      hybridCf: normalizePercent(config?.hybridWeights?.cf, 50),

      feedbackLike: normalizePercent(config?.feedbackMultipliers?.like, 110),
      feedbackDislike: normalizePercent(config?.feedbackMultipliers?.dislike, 50),
      feedbackLibrary: normalizePercent(config?.feedbackMultipliers?.library, 120),
      feedbackSkip: normalizePercent(config?.feedbackMultipliers?.skip, 90),

      cfTrackWeight: normalizePercent(config?.cfWeights?.trackWeight, 70),
      cfArtistWeight: normalizePercent(config?.cfWeights?.artistWeight, 30),

      learningRate: normalizePercent(config?.profileEvolution?.learningRate, 10),
      maxShift: normalizePercent(config?.profileEvolution?.maxShift, 30),

      playThreshold: normalizeNumber(config?.playCount?.threshold, 10),
      halfLifeDays: normalizeNumber(config?.playCount?.halfLifeDays, 30),
    });

    setConfigMeta({
      updatedAt: config?.updatedAt || "",
      updatedBy: config?.updatedBy || "",
    });
  }

  useEffect(() => {
    let active = true;

    async function loadConfig() {
      try {
        setLoading(true);
        setError("");
        setSuccess("");

        const config = await getAdminConfig();
        if (!active) return;

        applyConfigToState(config);
        setConfigAvailable(true);
      } catch (err) {
        if (!active) return;

        setConfigAvailable(false);
        setError(err.message || "Config kon niet geladen worden.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadConfig();

    return () => {
      active = false;
    };
  }, []);

  function updateSetting(key, value) {
    setSettings((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  }

  const radarData = useMemo(() => {
    return {
      labels: ["Genre", "CF", "Discovery", "Learning"],
      values: [
        settings.hybridGenre / 100,
        settings.hybridCf / 100,
        settings.feedbackLibrary / 200,
        settings.learningRate / 100,
      ],
    };
  }, [settings]);

  async function handleSave() {
    if (!configAvailable) return;

    const confirmed = window.confirm("Weet je zeker dat je deze modelinstellingen wilt opslaan?");
    if (!confirmed) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        hybridWeights: {
          genre: settings.hybridGenre / 100,
          cf: settings.hybridCf / 100,
        },
        feedbackMultipliers: {
          like: settings.feedbackLike / 100,
          dislike: settings.feedbackDislike / 100,
          library: settings.feedbackLibrary / 100,
          skip: settings.feedbackSkip / 100,
        },
        cfWeights: {
          trackWeight: settings.cfTrackWeight / 100,
          artistWeight: settings.cfArtistWeight / 100,
        },
        profileEvolution: {
          learningRate: settings.learningRate / 100,
          maxShift: settings.maxShift / 100,
        },
        playCount: {
          threshold: settings.playThreshold,
          halfLifeDays: settings.halfLifeDays,
        },
      };

      const updated = await updateAdminConfig(payload);
      applyConfigToState(updated);
      setSuccess("Modelinstellingen opgeslagen.");
    } catch (err) {
      const message = String(err?.message || "").toLowerCase();

      if (
        message.includes("failed to fetch") ||
        message.includes("networkerror") ||
        message.includes("load failed")
      ) {
        setError("Opslaan mislukt: PATCH wordt momenteel door de backend/CORS geblokkeerd.");
      } else {
        setError(err.message || "Opslaan mislukt.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (!configAvailable) return;

    const confirmed = window.confirm("Weet je zeker dat je de modelinstellingen wilt resetten?");
    if (!confirmed) return;

    try {
      setResetting(true);
      setError("");
      setSuccess("");

      const resetConfig = await resetAdminConfig();
      applyConfigToState(resetConfig);
      setSuccess("Modelinstellingen teruggezet naar defaults.");
    } catch (err) {
      const message = String(err?.message || "").toLowerCase();

      if (
        message.includes("failed to fetch") ||
        message.includes("networkerror") ||
        message.includes("load failed")
      ) {
        setError("Reset mislukt: request wordt momenteel door de backend/CORS geblokkeerd.");
      } else {
        setError(err.message || "Reset mislukt.");
      }
    } finally {
      setResetting(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#181919] p-5 text-text-primary">
        Config laden...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPoppy admin dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Model Settings</h1>
        <p className="mt-3 text-sm text-white/60">Recommendation tuning</p>
      </header>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mb-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          {success}
        </div>
      ) : null}

      {!configAvailable ? (
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#181919] p-5 text-sm text-white/60">
          De admin-config is nog niet beschikbaar op deze backend.
        </div>
      ) : null}

      <section className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
          <p className="text-sm text-white/60">Genre weight</p>
          <p className="mt-3 text-3xl font-bold text-text-primary">
            {configAvailable ? settings.hybridGenre : "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
          <p className="text-sm text-white/60">CF weight</p>
          <p className="mt-3 text-3xl font-bold text-text-primary">
            {configAvailable ? settings.hybridCf : "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
          <p className="text-sm text-white/60">Updated at</p>
          <p className="mt-3 text-sm font-semibold text-text-primary">
            {configAvailable && configMeta.updatedAt
              ? new Date(configMeta.updatedAt).toLocaleString()
              : "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
          <p className="text-sm text-white/60">Updated by</p>
          <p className="mt-3 text-sm font-semibold text-text-primary">
            {configAvailable ? configMeta.updatedBy || "—" : "—"}
          </p>
        </div>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Panel title="Tuning">
          <div className="space-y-4">
            <SettingRow
              label="Hybrid genre"
              value={settings.hybridGenre}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("hybridGenre", e.target.value)}
            />

            <SettingRow
              label="Hybrid CF"
              value={settings.hybridCf}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("hybridCf", e.target.value)}
            />

            <SettingRow
              label="Like multiplier"
              value={settings.feedbackLike}
              min={0}
              max={200}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("feedbackLike", e.target.value)}
            />

            <SettingRow
              label="Dislike multiplier"
              value={settings.feedbackDislike}
              min={0}
              max={200}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("feedbackDislike", e.target.value)}
            />

            <SettingRow
              label="Library multiplier"
              value={settings.feedbackLibrary}
              min={0}
              max={200}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("feedbackLibrary", e.target.value)}
            />

            <SettingRow
              label="Skip multiplier"
              value={settings.feedbackSkip}
              min={0}
              max={200}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("feedbackSkip", e.target.value)}
            />

            <SettingRow
              label="CF track weight"
              value={settings.cfTrackWeight}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("cfTrackWeight", e.target.value)}
            />

            <SettingRow
              label="CF artist weight"
              value={settings.cfArtistWeight}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("cfArtistWeight", e.target.value)}
            />

            <SettingRow
              label="Learning rate"
              value={settings.learningRate}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("learningRate", e.target.value)}
            />

            <SettingRow
              label="Max shift"
              value={settings.maxShift}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("maxShift", e.target.value)}
            />

            <SettingRow
              label="Play threshold"
              value={settings.playThreshold}
              min={0}
              max={100}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("playThreshold", e.target.value)}
            />

            <SettingRow
              label="Half life days"
              value={settings.halfLifeDays}
              min={1}
              max={180}
              disabled={!configAvailable}
              onChange={(e) => updateSetting("halfLifeDays", e.target.value)}
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
        <button
          onClick={handleSave}
          disabled={saving || !configAvailable}
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Opslaan..." : "Wijzigingen opslaan"}
        </button>

        <button
          onClick={handleReset}
          disabled={resetting || !configAvailable}
          className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 transition hover:bg-white/8 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resetting ? "Resetten..." : "Reset"}
        </button>
      </section>
    </div>
  );
}