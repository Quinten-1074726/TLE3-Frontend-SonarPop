function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-3 text-3xl font-bold text-text-primary">{value}</p>
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

function EmptyTableState() {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-white/50">
      Nog geen gebruikersdata beschikbaar.
    </div>
  );
}

export default function Users() {
  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/45">
          SonarPoppy admin dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold">Users</h1>
        <p className="mt-3 text-sm text-white/60">Role management</p>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard title="Totaal users" value="—" />
        <StatCard title="Admins" value="—" />
        <StatCard title="Curators" value="—" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_320px]">
        <Panel title="Gebruikersoverzicht">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Zoek gebruiker..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 md:max-w-sm"
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <div className="hidden grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.14em] text-white/45 md:grid">
              <span>Gebruiker</span>
              <span>Rol</span>
              <span>Actie</span>
            </div>

            <div className="p-4">
              <EmptyTableState />
            </div>
          </div>
        </Panel>

        <Panel title="Roldetails">
          <div className="space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Naam</p>
              <p className="mt-1 text-xs text-white/55">—</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-text-primary">Huidige rol</p>
              <p className="mt-1 text-xs text-white/55">—</p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="mb-3 text-sm font-semibold text-text-primary">Nieuwe rol</p>

              <select className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none">
                <option className="bg-[#111315]">user</option>
                <option className="bg-[#111315]">curator</option>
                <option className="bg-[#111315]">admin</option>
              </select>
            </div>

            <button className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/15">
              Rol opslaan
            </button>
          </div>
        </Panel>
      </section>
    </div>
  );
}