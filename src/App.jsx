import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Statistics from "./pages/Statistics.jsx";
import Library from "./pages/Library.jsx";
import Error from "./pages/Error.jsx";
import Preferences from "./pages/Preferences.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", 
        element: <Home /> },

      { path: "/statistics", 
        element: <Statistics /> },
        
      { path: "/library", 
        element: <Library /> },

      { path: "/preferences",
        element: <Preferences /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}