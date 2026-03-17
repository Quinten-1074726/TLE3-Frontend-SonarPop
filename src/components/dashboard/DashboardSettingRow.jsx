export default function DashboardSettingRow({
  label,
  value,
  min = 0,
  max = 100,
  onChange,
  disabled = false,
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-semibold text-text-primary">{label}</p>

        <div className="w-full lg:w-[280px]">
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