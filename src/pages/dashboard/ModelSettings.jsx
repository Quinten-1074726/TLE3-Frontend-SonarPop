import { useEffect, useMemo, useState } from "react";
import RadarChart from "../../components/charts/RadarChart.jsx";
import DashboardMiniStat from "../../components/dashboard/DashboardMiniStat.jsx";
import DashboardPanel from "../../components/dashboard/DashboardPanel.jsx";
import DashboardSettingRow from "../../components/dashboard/DashboardSettingRow.jsx";
import DashboardTabButton from "../../components/dashboard/DashboardTabButton.jsx";
import {
  getAdminConfig,
  updateAdminConfig,
  resetAdminConfig,
} from "../../services/admin.js";
import { addActivityLogItem } from "../../services/activityLog.js";

const SECTION_OPTIONS = [
  { key: "mix", label: "Mix" },
  { key: "feedback", label: "Feedback" },
  { key: "similarity", label: "Similarity" },
  { key: "profile", label: "Profile" },
];

const SECTION_FIELDS = {
  mix: [
    { key: "hybridGenre", label: "Genre match", type: "hybridGenre" },
    { key: "hybridCf", label: "Similar listeners", type: "hybridCf" },
  ],
  feedback: [
    { key: "feedbackLike", label: "Like boost", min: 0, max: 200 },
    { key: "feedbackDislike", label: "Dislike penalty", min: 0, max: 200 },
    { key: "feedbackLibrary", label: "Library boost", min: 0, max: 200 },
    { key: "feedbackSkip", label: "Skip penalty", min: 0, max: 200 },
  ],
  similarity: [
    { key: "cfTrackWeight", label: "Track similarity" },
    { key: "cfArtistWeight", label: "Artist similarity" },
  ],
  profile: [
    { key: "profileLike", label: "Like adaptation" },
    { key: "profileLibrary", label: "Library adaptation" },
    { key: "profileDislike", label: "Dislike adaptation" },
    { key: "profileSkip", label: "Skip adaptation" },
    { key: "playThreshold", label: "Play threshold", min: 0, max: 200 },
    { key: "halfLifeDays", label: "Decay days", min: 1, max: 365 },
  ],
};

const DEFAULT_SETTINGS = {
  hybridGenre: 50,
  hybridCf: 50,
  feedbackLike: 130,
  feedbackDislike: 112,
  feedbackLibrary: 147,
  feedbackSkip: 153,
  cfTrackWeight: 70,
  cfArtistWeight: 30,
  profileLike: 10,
  profileLibrary: 15,
  profileDislike: 15,
  profileSkip: 5,
  playThreshold: 65,
  halfLifeDays: 122,
};

function normalizePercent(value, fallback = 50) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.round(value * 100);
}

function normalizeNumber(value, fallback = 0) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return value;
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

function buildPayload(settings) {
  const normalizedGenre = settings.hybridGenre / 100;
  const normalizedCf = 1 - normalizedGenre;

  return {
    hybridWeights: {
      genre: normalizedGenre,
      cf: normalizedCf,
    },
    feedbackMultipliers: {
      like: settings.feedbackLike / 100,
      dislike: settings.feedbackDislike / 100,
      library: settings.feedbackLibrary / 100,
      skip: settings.feedbackSkip / 100,
    },
    cfWeights: {
      track: settings.cfTrackWeight / 100,
      artist: settings.cfArtistWeight / 100,
    },
    profileEvolution: {
      like: settings.profileLike / 100,
      library: settings.profileLibrary / 100,
      dislike: -(settings.profileDislike / 100),
      skip: -(settings.profileSkip / 100),
    },
    playCount: {
      threshold: settings.playThreshold,
      halfLifeDays: settings.halfLifeDays,
    },
  };
}

export default function ModelSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [configAvailable, setConfigAvailable] = useState(false);
  const [activeSection, setActiveSection] = useState("mix");

  const [configMeta, setConfigMeta] = useState({
    updatedAt: "",
    updatedBy: "",
  });

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  function applyConfigToState(config) {
    const safeHybrid = getSafeHybridValues(config);

    setSettings({
      hybridGenre: safeHybrid.genre,
      hybridCf: safeHybrid.cf,

      feedbackLike: normalizePercent(config?.feedbackMultipliers?.like, 130),
      feedbackDislike: normalizePercent(config?.feedbackMultipliers?.dislike, 112),
      feedbackLibrary: normalizePercent(config?.feedbackMultipliers?.library, 147),
      feedbackSkip: normalizePercent(config?.feedbackMultipliers?.skip, 153),

      cfTrackWeight: normalizePercent(
        config?.cfWeights?.trackWeight ?? config?.cfWeights?.track,
        70
      ),
      cfArtistWeight: normalizePercent(
        config?.cfWeights?.artistWeight ?? config?.cfWeights?.artist,
        30
      ),

      profileLike: normalizePercent(config?.profileEvolution?.like, 10),
      profileLibrary: normalizePercent(config?.profileEvolution?.library, 15),
      profileDislike: Math.abs(
        normalizePercent(config?.profileEvolution?.dislike, -15)
      ),
      profileSkip: Math.abs(
        normalizePercent(config?.profileEvolution?.skip, -5)
      ),

      playThreshold: normalizeNumber(config?.playCount?.threshold, 65),
      halfLifeDays: normalizeNumber(config?.playCount?.halfLifeDays, 122),
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

  useEffect(() => {
    if (!success) return;

    const timer = window.setTimeout(() => {
      setSuccess("");
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [success]);

  function updateSetting(key, value) {
    setSettings((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  }

  function updateHybridGenre(value) {
    const numericValue = Number(value);

    setSettings((prev) => ({
      ...prev,
      hybridGenre: numericValue,
      hybridCf: 100 - numericValue,
    }));
  }

  function updateHybridCf(value) {
    const numericValue = Number(value);

    setSettings((prev) => ({
      ...prev,
      hybridCf: numericValue,
      hybridGenre: 100 - numericValue,
    }));
  }

  function renderSection() {
    const fields = SECTION_FIELDS[activeSection] || [];

    return (
      <div className="space-y-4">
        {fields.map((field) => {
          let onChange;

          if (field.type === "hybridGenre") {
            onChange = (e) => updateHybridGenre(e.target.value);
          } else if (field.type === "hybridCf") {
            onChange = (e) => updateHybridCf(e.target.value);
          } else {
            onChange = (e) => updateSetting(field.key, e.target.value);
          }

          return (
            <DashboardSettingRow
              key={field.key}
              label={field.label}
              value={settings[field.key]}
              min={field.min ?? 0}
              max={field.max ?? 100}
              disabled={!configAvailable}
              onChange={onChange}
            />
          );
        })}
      </div>
    );
  }

  const radarData = useMemo(() => {
    return {
      labels: ["Genre", "Listeners", "Library", "Track", "Artist", "Profile"],
      values: [
        settings.hybridGenre / 100,
        settings.hybridCf / 100,
        settings.feedbackLibrary / 200,
        settings.cfTrackWeight / 100,
        settings.cfArtistWeight / 100,
        settings.profileLibrary / 100,
      ],
    };
  }, [settings]);

  async function handleSave() {
    if (!configAvailable) return;

    const confirmed = window.confirm(
      "Weet je zeker dat je deze modelinstellingen wilt opslaan?"
    );
    if (!confirmed) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = buildPayload(settings);
      const updated = await updateAdminConfig(payload);

      applyConfigToState(updated);
      setSuccess("Modelinstellingen opgeslagen.");

      addActivityLogItem({
        type: "success",
        title: "Modelinstellingen opgeslagen",
        description: "Een admin heeft recommendation tuning aangepast en opgeslagen.",
        source: "model-settings",
      });
    } catch (err) {
      const message = String(err?.message || "").toLowerCase();

      if (
        message.includes("failed to fetch") ||
        message.includes("networkerror") ||
        message.includes("load failed")
      ) {
        setError("Opslaan mislukt: request naar backend is mislukt.");
      } else {
        setError(err.message || "Opslaan mislukt.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (!configAvailable) return;

    const confirmed = window.confirm(
      "Weet je zeker dat je de modelinstellingen wilt resetten?"
    );
    if (!confirmed) return;

    try {
      setResetting(true);
      setError("");
      setSuccess("");

      const resetConfig = await resetAdminConfig();
      applyConfigToState(resetConfig);
      setSuccess("Modelinstellingen teruggezet naar defaults.");

      addActivityLogItem({
        type: "warning",
        title: "Modelinstellingen gereset",
        description: "Een admin heeft de recommendation tuning teruggezet naar defaults.",
        source: "model-settings",
      });
    } catch (err) {
      const message = String(err?.message || "").toLowerCase();

      if (
        message.includes("failed to fetch") ||
        message.includes("networkerror") ||
        message.includes("load failed")
      ) {
        setError("Reset mislukt: request naar backend is mislukt.");
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
        <div className="mb-4 flex items-start justify-between gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <span>{success}</span>

          <button
            type="button"
            onClick={() => setSuccess("")}
            className="rounded-md px-2 py-1 text-emerald-300/80 transition hover:bg-emerald-400/10 hover:text-emerald-200"
            aria-label="Sluit melding"
          >
            ×
          </button>
        </div>
      ) : null}

      {!configAvailable ? (
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#181919] p-5 text-sm text-white/60">
          De admin-config is nog niet beschikbaar op deze backend.
        </div>
      ) : null}

      <section className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMiniStat
          label="Genre match"
          value={configAvailable ? settings.hybridGenre : "—"}
        />
        <DashboardMiniStat
          label="Similar listeners"
          value={configAvailable ? settings.hybridCf : "—"}
        />
        <DashboardMiniStat
          label="Updated at"
          value={
            configAvailable && configMeta.updatedAt
              ? new Date(configMeta.updatedAt).toLocaleString()
              : "—"
          }
        />
        <DashboardMiniStat
          label="Updated by"
          value={configAvailable ? configMeta.updatedBy || "—" : "—"}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_380px]">
        <DashboardPanel
          title="Tuning"
          right={
            <div className="flex flex-wrap gap-2">
              {SECTION_OPTIONS.map((section) => (
                <DashboardTabButton
                  key={section.key}
                  active={activeSection === section.key}
                  onClick={() => setActiveSection(section.key)}
                >
                  {section.label}
                </DashboardTabButton>
              ))}
            </div>
          }
        >
          {renderSection()}
        </DashboardPanel>

        <div className="space-y-4">
          <DashboardPanel title="Model profile">
            <RadarChart
              labels={radarData.labels}
              values={radarData.values}
              chartLabel="Model profile"
            />
          </DashboardPanel>

          <DashboardPanel title="Actions">
            <div className="flex flex-col gap-3">
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
            </div>
          </DashboardPanel>
        </div>
      </section>
    </div>
  );
}