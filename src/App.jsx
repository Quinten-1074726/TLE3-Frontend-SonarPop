import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/ui/Layout.jsx";
import Home from "./pages/Home.jsx";
import Statistics from "./pages/Statistics.jsx";
import Library from "./pages/Library.jsx";
import Error from "./pages/Error.jsx";
import MusicPlayer from "./pages/MusicPlayer.jsx";
import Preferences from "./pages/Preferences.jsx";
import CreatePlaylistComponent from "./components/CreatePlaylistComponent.jsx";

const router = createBrowserRouter([
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
                path: "/song",
                element: <MusicPlayer/>,
            },

            {
                path: "/preferences",
                element: <Preferences/>
            },

            {
                path: "/createPlaylist",
                element: <CreatePlaylistComponent/>
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router}/>;
}