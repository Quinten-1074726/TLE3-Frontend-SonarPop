import { useMemo, useState } from "react";
import { clearActivityLog, getActivityLog } from "../../services/activityLog.js";

function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <h2 className="mb-4 text-xl font-semibold text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

function EmptyLogState() {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-white/50">
      Nog geen logitems beschikbaar.
    </div>
  );
}

function LogRow({ item, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "grid w-full gap-3 rounded-xl border px-4 py-3 text-left transition md:grid-cols-[1fr_auto_auto] md:items-center",
        isActive
          ? "border-white/20 bg-white/[0.06]"
          : "border-white/8 bg-white/[0.03] hover:bg-white/[0.05]",
      ].join(" ")}
    >
      <p className="text-sm font-semibold text-text-primary">{item.title}</p>

      <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
        {item.type}
      </span>

      <span className="text-xs text-white/45">
        {new Date(item.timestamp).toLocaleString()}
      </span>
    </button>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-3 text-3xl font-bold text-text-primary">{value}</p>
    </div>
  );
}

export default function Logs() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const allItems = getActivityLog();

    return allItems.filter((item) => {
      const matchesFilter = filter === "all" ? true : item.type === filter;
      const haystack = `${item.title} ${item.description} ${item.source}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });
  }, [refreshKey, filter, query]);

  const selectedItem =
    items.find((item) => item.id === selectedId) || items[0] || null;

  const stats = useMemo(() => {
    const allItems = getActivityLog();

    return {
      total: allItems.length,
      success: allItems.filter((item) => item.type === "success").length,
      info: allItems.filter((item) => item.type === "info").length,
      warning: allItems.filter((item) => item.type === "warning").length,
    };
  }, [refreshKey]);

  function handleClear() {
    const confirmed = window.confirm("Weet je zeker dat je alle logitems wilt wissen?");
    if (!confirmed) return;

    clearActivityLog();
    setSelectedId(null);
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPoppy admin dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Logs</h1>
        <p className="mt-3 text-sm text-white/60">Audit & events</p>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Totaal" value={stats.total} />
        <StatCard title="Success" value={stats.success} />
        <StatCard title="Info" value={stats.info} />
        <StatCard title="Warning" value={stats.warning} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_320px]">
        <Panel title="Log stream">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:bg-white/8 hover:text-white"
              >
                Alles
              </button>
              <button
                type="button"
                onClick={() => setFilter("success")}
                className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:bg-white/8 hover:text-white"
              >
                Success
              </button>
              <button
                type="button"
                onClick={() => setFilter("info")}
                className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:bg-white/8 hover:text-white"
              >
                Info
              </button>
              <button
                type="button"
                onClick={() => setFilter("warning")}
                className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:bg-white/8 hover:text-white"
              >
                Warning
              </button>
            </div>

            <div className="flex w-full gap-3 md:w-auto">
              <input
                type="text"
                placeholder="Zoek logitem..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 md:w-[220px]"
              />

              <button
                type="button"
                onClick={handleClear}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80 transition hover:bg-white/8 hover:text-white"
              >
                Wis
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {items.length === 0 ? (
              <EmptyLogState />
            ) : (
              items.map((item) => (
                <LogRow
                  key={item.id}
                  item={item}
                  isActive={selectedItem?.id === item.id}
                  onClick={() => setSelectedId(item.id)}
                />
              ))
            )}
          </div>
        </Panel>

        <Panel title="Event details">
          <div className="space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Type</p>
              <p className="mt-1 text-xs text-white/55">
                {selectedItem?.type || "—"}
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Tijdstip</p>
              <p className="mt-1 text-xs text-white/55">
                {selectedItem?.timestamp
                  ? new Date(selectedItem.timestamp).toLocaleString()
                  : "—"}
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Beschrijving</p>
              <p className="mt-1 text-xs text-white/55">
                {selectedItem?.description || "—"}
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Bron</p>
              <p className="mt-1 text-xs text-white/55">
                {selectedItem?.source || "—"}
              </p>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}