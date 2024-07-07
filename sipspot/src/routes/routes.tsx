import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import ErrorPage from "../pages/ErrorPage";

export const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />, // Use the component directly
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
