export default function DashboardSettingRow({
  label,
  value,
  min = 0,
  max = 100,
  onChange,
  disabled = false,
  id,
}) {
  const inputId = id || `setting-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-text-primary"
        >
          {label}
        </label>

        <div className="w-full lg:w-[280px]">
          <input
            id={inputId}
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full accent-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-[#181919]"
          />
          <p className="mt-2 text-right text-xs text-white/70">{value}</p>
        </div>
      </div>
    </div>
  );
}