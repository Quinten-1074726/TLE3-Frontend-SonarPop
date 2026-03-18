export default function DashboardMiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
      <p className="text-xs text-white/70">{label}</p>
      <p className="mt-2 text-base font-semibold text-text-primary">{value}</p>
    </div>
  );
}