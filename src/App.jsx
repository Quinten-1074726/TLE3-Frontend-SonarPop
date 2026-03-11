import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/ui/Layout.jsx";
import Home from "./pages/home.jsx";
import Statistics from "./pages/Statistics.jsx";
import Library from "./pages/Library.jsx";
import Error from "./pages/Error.jsx";
import Preferences from "./pages/Preferences.jsx";
import CreatePlaylistComponent from "./components/CreatePlaylistComponent.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Playlist from "./pages/Playlist.jsx";
import Waitlist from "./pages/Waitlist.jsx";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        element: <Layout/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/statistics",
                element: <Statistics/>,
            },
            {
                path: "/library",
                element: <Library/>,
            },
            {
                path: "/preferences",
                element: <Preferences/>
            },

            { path: "/createPlaylist",
                element: <CreatePlaylistComponent />
            },

              {
                path: "/dashboard",
                element: <Dashboard />,
              },
            {
                path: "/playlist",
                element: <Playlist/>
            },
            {
                path: "/waitlist",
                element: <Waitlist/>
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router}/>;
}