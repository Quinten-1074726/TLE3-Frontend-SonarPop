import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "./AuthStorage";

export default function RoleRoute({ allowedRoles = [] }) {
  const role = getUserRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}