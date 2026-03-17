export default function DashboardPanel({ title, children, right }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#181919] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        {right || null}
      </div>
      {children}
    </section>
  );
}