import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/ui/Layout.jsx";

import Home from "./pages/Home.jsx";
import Statistics from "./pages/Statistics.jsx";
import Library from "./pages/Library.jsx";
import Error from "./pages/Error.jsx";
import Preferences from "./pages/Preferences.jsx";
import CreatePlaylistComponent from "./components/CreatePlaylistComponent.jsx";
import Playlist from "./pages/Playlist.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Policy from "./pages/Policy.jsx";

import Dashboard from "./pages/dashboard/DashboardHome.jsx";
import BiasAnalysis from "./pages/dashboard/BiasAnalysis.jsx";
import ModelSettings from "./pages/dashboard/ModelSettings.jsx";
import Users from "./pages/dashboard/Users.jsx";
import Logs from "./pages/dashboard/Logs.jsx";

import DashboardLayout from "./components/ui/DashboardLayout.jsx";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import RoleRoute from "./auth/RoleRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/onboarding",
        element: <Onboarding />,
      },

      {
        element: <Layout />,
        errorElement: <Error />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/statistics",
            element: <Statistics />,
          },
          {
            path: "/library",
            element: <Library />,
          },
          {
            path: "/preferences",
            element: <Preferences />,
          },
          {
            path: "/createPlaylist",
            element: <CreatePlaylistComponent />,
          },
          {
            path: "/playlist",
            element: <Playlist />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/policy",
            element: <Policy />,
          },
        ],
      },

      {
        element: <RoleRoute allowedRoles={["admin", "curator"]} />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "bias-analysis",
                element: <BiasAnalysis />,
              },
              {
                element: <RoleRoute allowedRoles={["admin"]} />,
                children: [
                  {
                    path: "model-settings",
                    element: <ModelSettings />,
                  },
                  {
                    path: "users",
                    element: <Users />,
                  },
                  {
                    path: "logs",
                    element: <Logs />,
                  },
 
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}