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

import {
  SECTION_OPTIONS,
  SECTION_FIELDS,
  DEFAULT_SETTINGS,
  mapConfigToSettings,
  mapConfigToMeta,
  buildPayload,
} from "./modelSettings.helpers.js";

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

  function applyConfig(config) {
    setSettings(mapConfigToSettings(config));
    setConfigMeta(mapConfigToMeta(config));
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

        applyConfig(config);
        setConfigAvailable(true);
      } catch (err) {
        if (!active) return;
        setConfigAvailable(false);
        setError(err.message || "Failed to load config.");
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

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [success]);

  function updateSetting(key, value) {
    const numericValue = Number(value);

    setSettings((prev) => {
      // FIX: CF weights must sum to 100
      if (key === "cfTrackWeight") {
        return {
          ...prev,
          cfTrackWeight: numericValue,
          cfArtistWeight: 100 - numericValue,
        };
      }

      if (key === "cfArtistWeight") {
        return {
          ...prev,
          cfArtistWeight: numericValue,
          cfTrackWeight: 100 - numericValue,
        };
      }

      return {
        ...prev,
        [key]: numericValue,
      };
    });
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
      "Are you sure you want to save these model settings?"
    );
    if (!confirmed) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = buildPayload(settings);
      const updated = await updateAdminConfig(payload);

      applyConfig(updated);
      setSuccess("Model settings saved successfully.");

      // SAFE LOGGING
      try {
        addActivityLogItem({
          type: "success",
          title: "Model settings saved",
          description: "Recommendation tuning updated.",
          source: "model-settings",
        });
      } catch (err) {
        console.error("Activity log failed:", err);
      }
    } catch (err) {
      setError(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (!configAvailable) return;

    const confirmed = window.confirm(
      "Are you sure you want to reset the model settings?"
    );
    if (!confirmed) return;

    try {
      setResetting(true);
      setError("");
      setSuccess("");

      const resetConfig = await resetAdminConfig();
      applyConfig(resetConfig);

      setSuccess("Model settings reset to defaults.");

      try {
        addActivityLogItem({
          type: "warning",
          title: "Model settings reset",
          description: "Recommendation tuning reset.",
          source: "model-settings",
        });
      } catch (err) {
        console.error("Activity log failed:", err);
      }
    } catch (err) {
      setError(err.message || "Reset failed.");
    } finally {
      setResetting(false);
    }
  }

  if (loading) {
    return <div className="p-5 text-text-primary">Loading config...</div>;
  }

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Model Settings</h1>
        <p className="mt-2 text-sm text-white/70">
          Configure the recommendation model behavior
        </p>
      </header>

      {error && (
        <div className="mb-4 rounded-xl bg-red-500/20 p-4 text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-xl bg-emerald-500/20 p-4 text-emerald-200">
          {success}
        </div>
      )}

      <section className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMiniStat label="Genre match" value={settings.hybridGenre} />
        <DashboardMiniStat label="Similar listeners" value={settings.hybridCf} />
        <DashboardMiniStat
          label="Updated at"
          value={
            configMeta.updatedAt
              ? new Date(configMeta.updatedAt).toLocaleString()
              : "—"
          }
        />
        <DashboardMiniStat
          label="Updated by"
          value={configMeta.updatedBy || "—"}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_380px]">
        <DashboardPanel
          title="Tuning"
          right={
            <div className="flex gap-2">
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
                disabled={saving}
                className="rounded-xl bg-white/10 px-4 py-3"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>

              <button
                onClick={handleReset}
                disabled={resetting}
                className="rounded-xl border px-4 py-3"
              >
                {resetting ? "Resetting..." : "Reset"}
              </button>
            </div>
          </DashboardPanel>
        </div>
      </section>
    </div>
  );
}