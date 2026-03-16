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

function LogRow({ title, type, timestamp }) {
  return (
    <div className="grid gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 md:grid-cols-[1fr_auto_auto] md:items-center">
      <p className="text-sm font-semibold text-text-primary">{title}</p>

      <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
        {type}
      </span>

      <span className="text-xs text-white/45">{timestamp}</span>
    </div>
  );
}

export default function Logs() {
  const logItems = [];

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPoppy admin dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Logs</h1>
        <p className="mt-3 text-sm text-white/60">Audit & events</p>
      </header>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_320px]">
        <Panel title="Log stream">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:bg-white/8 hover:text-white">
                Alles
              </button>
              <button className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:bg-white/8 hover:text-white">
                Model
              </button>
              <button className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:bg-white/8 hover:text-white">
                Users
              </button>
              <button className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:bg-white/8 hover:text-white">
                Systeem
              </button>
            </div>

            <input
              type="text"
              placeholder="Zoek logitem..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 md:max-w-xs"
            />
          </div>

          <div className="space-y-3">
            {logItems.length === 0 ? (
              <EmptyLogState />
            ) : (
              logItems.map((item, index) => (
                <LogRow
                  key={`${item.title}-${index}`}
                  title={item.title}
                  type={item.type}
                  timestamp={item.timestamp}
                />
              ))
            )}
          </div>
        </Panel>

        <Panel title="Event details">
          <div className="space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Type</p>
              <p className="mt-1 text-xs text-white/55">—</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Tijdstip</p>
              <p className="mt-1 text-xs text-white/55">—</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Beschrijving</p>
              <p className="mt-1 text-xs text-white/55">—</p>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}