import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, getUserRole, getStoredUser } from "../../auth/AuthStorage";
import useDashboardView from "../../hooks/useDashboardView";

function navItemClass(isActive) {
  return [
    "block w-full rounded-xl px-4 py-3 text-sm transition",
    isActive
      ? "bg-white/10 text-white"
      : "text-white/75 hover:bg-white/8 hover:text-white",
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
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-white/10 bg-[#0d1117] p-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              SonarPoppy
            </p>

            <h1 className="mt-2 text-2xl font-bold">Dashboard</h1>

            <p className="mt-2 text-sm text-white/60">
              {user?.username || "User"} · {role}
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} className={navItemClass(isActive)}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm text-white/75 transition hover:bg-white/8 hover:text-white"
          >
            Logout
          </button>
        </aside>

        <main className="min-w-0 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;