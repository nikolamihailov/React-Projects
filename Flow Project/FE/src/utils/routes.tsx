import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import Login from "../features/user/auth/Login";
import Register from "../features/user/auth/Register";
import Services from "../pages/Services";
import Appointments from "../pages/Appointments";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Profile";
import PublicRoute from "./RouteGuards/PublicRoute";
import ProtectedRoute from "./RouteGuards/ProtectedRoute";
import AdminRoute from "./RouteGuards/AdminRoute";
import ServicePage from "../pages/ServicePage";
import AdminLayout from "../pages/AdminLayout";
import Admin from "../pages/Admin";
import AdminServices from "../pages/AdminServices";
import AdminUsers from "../pages/AdminUsers";
import AdminAppointments from "../pages/AdminAppointments";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <LandingPage />,
        index: true,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "services/:id",
            element: <ServicePage />,
          },
          {
            path: "appointments",
            element: <Appointments />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin-panel",
    element: <AdminLayout />,
    children: [
      {
        element: <AdminRoute />,
        children: [
          {
            element: <Admin />,
            index: true,
          },
          {
            path: "services",
            element: <AdminServices />,
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "appointments",
            element: <AdminAppointments />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);
