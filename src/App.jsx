import {createBrowserRouter, RouterProvider} from "react-router";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ],
  },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;