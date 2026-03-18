export default function DashboardTabButton({
  active,
  children,
  onClick,
  controls,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      className={[
        "rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-[#111315]",
        active
          ? "border-white/20 bg-white/12 text-white"
          : "border-white/12 text-white/80 hover:bg-white/8 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}