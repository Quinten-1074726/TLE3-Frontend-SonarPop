import { Navigate } from "react-router-dom";
import { getUserRole } from "./AuthStorage";
import Home from "../pages/Home.jsx";

export default function HomeRedirect() {
  const role = getUserRole();

  if (role === "admin" || role === "curator") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Home />;
}