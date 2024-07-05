import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

import "./index.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/recipes",
          element: <Recipes />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
