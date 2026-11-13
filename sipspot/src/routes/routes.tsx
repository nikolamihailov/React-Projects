import { ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "@/pages/Layout";
import Home from "@/pages/Home";
import ErrorPage from "@/pages/Error";

// Home is the usual landing page, so it ships in the main bundle;
// every other page is split into its own chunk and only downloaded when visited
const lazyPage = (load: () => Promise<{ default: ComponentType }>) => async () => {
    const { default: Component } = await load();
    return { Component };
};

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // last resort if the layout itself fails
        errorElement: <ErrorPage />,
        children: [
            {
                // pathless wrapper: a page that throws shows the error inside the layout, keeping header and footer
                errorElement: <ErrorPage />,
                children: [
                    {
                        element: <Home />,
                        index: true,
                    },
                    {
                        path: "/recipes",
                        lazy: lazyPage(() => import("@/pages/Recipes")),
                    },
                    {
                        path: "/recipes/:id",
                        lazy: lazyPage(() => import("@/pages/CocktailDetails")),
                    },
                    {
                        path: "/gallery",
                        lazy: lazyPage(() => import("@/pages/Gallery")),
                    },
                    {
                        path: "/about-us",
                        lazy: lazyPage(() => import("@/pages/About")),
                    },
                    {
                        path: "*",
                        element: <ErrorPage />,
                    },
                ],
            },
        ],
    },
]);
