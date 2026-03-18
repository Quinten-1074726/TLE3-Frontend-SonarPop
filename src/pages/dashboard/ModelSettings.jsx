import { useEffect, useMemo, useRef, useState } from "react";
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
import {
  SECTION_OPTIONS,
  SECTION_FIELDS,
  DEFAULT_SETTINGS,
  mapConfigToSettings,
  mapConfigToMeta,
  buildPayload,
} from "./modelSettings.helpers.js";

export default function ModelSettings() {
  const headingRef = useRef(null);

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

  function applyConfig(config) {
    setSettings(mapConfigToSettings(config));
    setConfigMeta(mapConfigToMeta(config));
  }

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    let active = true;

    async function loadConfig() {
      try {
        setLoading(true);
        setError("");
        setSuccess("");

        const config = await getAdminConfig();
        if (!active) return;

        applyConfig(config);
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
      <div
        id={`panel-${activeSection}`}
        role="tabpanel"
        aria-label={`${activeSection} settings`}
        className="space-y-4"
      >
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
              id={`setting-${field.key}`}
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
      labels: ["Genre", "Listeners", "Library", "Track", "Artist", "Learning"],
      values: [
        settings.hybridGenre / 100,
        settings.hybridCf / 100,
        settings.feedbackLibrary / 200,
        settings.cfTrackWeight / 100,
        settings.cfArtistWeight / 100,
        settings.learningRate / 100,
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

      applyConfig(updated);
      setSuccess("Modelinstellingen opgeslagen.");

      addActivityLogItem({
        type: "success",
        title: "Modelinstellingen opgeslagen",
        description:
          "Een admin heeft recommendation tuning aangepast en opgeslagen.",
        source: "model-settings",
      });
    } catch (err) {
      setError(err.message || "Opslaan mislukt.");
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
      applyConfig(resetConfig);
      setSuccess("Modelinstellingen teruggezet naar defaults.");
    } catch (err) {
      setError(err.message || "Reset mislukt.");
    } finally {
      setResetting(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/12 bg-[#181919] p-5 text-text-primary">
        Config laden...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/65">
          SonarPop admin dashboard
        </p>

        <h1
          ref={headingRef}
          tabIndex="-1"
          className="mt-2 text-4xl font-bold text-text-primary"
        >
          Model Settings
        </h1>

        <p className="mt-3 text-sm text-white/75">
          Configure the current recommendation model behavior
        </p>
      </header>

      {error && (
        <div
          className="mb-4 rounded-2xl border border-red-400/25 bg-red-500/12 p-4 text-sm text-red-200"
          role="alert"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="mb-4 flex justify-between rounded-2xl border border-emerald-400/25 bg-emerald-500/12 p-4 text-sm text-emerald-200"
          role="status"
        >
          <span>{success}</span>
          <button
            onClick={() => setSuccess("")}
            className="focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            ×
          </button>
        </div>
      )}

      <section className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMiniStat label="Genre match" value={settings.hybridGenre} />
        <DashboardMiniStat label="Similar listeners" value={settings.hybridCf} />
        <DashboardMiniStat label="Updated at" value={configMeta.updatedAt} />
        <DashboardMiniStat label="Updated by" value={configMeta.updatedBy} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_380px]">
        <DashboardPanel
          title="Tuning"
          right={
            <div role="tablist" className="flex gap-2">
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
            <RadarChart {...radarData} />
          </DashboardPanel>

          <DashboardPanel title="Actions">
            <button onClick={handleSave} className="w-full">
              Opslaan
            </button>
            <button onClick={handleReset} className="w-full">
              Reset
            </button>
          </DashboardPanel>
        </div>
      </section>
    </div>
  );
}