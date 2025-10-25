import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout/index.tsx";
import Home from "../pages/Home/Home.tsx";
import { Settings } from "@/pages/Settings/Settings.tsx";
import { List } from "@/pages/List/index.ts";
import { Vocabulary } from "@/pages/Vocabulary/index.ts";
import { Random } from "@/pages/Random";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/vocabulary",
        element: <Vocabulary />,
      },
      {
        path: "/random",
        element: <Random />,
      },
    ],
  },
]);
