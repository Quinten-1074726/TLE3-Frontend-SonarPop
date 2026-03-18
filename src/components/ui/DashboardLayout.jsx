import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, getUserRole, getStoredUser } from "../../auth/AuthStorage";
import useDashboardView from "../../hooks/useDashboardView";

function navItemClass(isActive) {
  return [
    "block w-full rounded-xl px-4 py-3 text-sm transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]",
    isActive
      ? "bg-white/12 text-white"
      : "text-white/85 hover:bg-white/8 hover:text-white",
  ].join(" ");
}

function DashboardLayout() {
  useDashboardView();

  const navigate = useNavigate();
  const location = useLocation();

  const role = getUserRole();
  const user = getStoredUser();

  const isAdmin = role === "admin";
  const isCurator = role === "curator";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const navItems = [
    { label: "Overview", to: "/dashboard", visible: true },
    {
      label: "Bias & Analysis",
      to: "/dashboard/bias-analysis",
      visible: isAdmin || isCurator,
    },
    {
      label: "Model Settings",
      to: "/dashboard/model-settings",
      visible: isAdmin,
    },
    {
      label: "Users",
      to: "/dashboard/users",
      visible: isAdmin,
    },
    {
      label: "Logs",
      to: "/dashboard/logs",
      visible: isAdmin,
    },
  ].filter((item) => item.visible);

  return (
    <div className="min-h-screen bg-[#111315] text-text-primary">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-md bg-white px-4 py-2 text-sm text-black"
      >
        Ga naar hoofdinhoud
      </a>

      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-white/12 bg-[#0d1117] p-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/65">
              SonarPop
            </p>

            <h1 className="mt-2 text-2xl font-bold text-text-primary">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-white/75">
              {user?.username || "User"} · {role}
            </p>
          </div>

          <nav className="space-y-2" aria-label="Dashboard navigatie">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={navItemClass(isActive)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 w-full rounded-xl border border-white/12 px-4 py-3 text-left text-sm text-white/85 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
          >
            Logout
          </button>
        </aside>

        <main
          id="main-content"
          className="min-w-0 p-4 md:p-6 lg:p-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;