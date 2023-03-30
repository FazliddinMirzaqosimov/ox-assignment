import { Navigate } from "react-router-dom";
import { authPages } from "./auth";
import { dashboardPages } from "./dashboard";
import NotFoundPage from "./NotFoundPage";

export const unAuthorizedStructure = {
  paths: [
    ...authPages,
    {
      id: "0",
      path: "/",
      pageElement: <Navigate to="/auth/signin" replace={true} />,
    },
    {
      id: "-1",
      path: "/not-found",
      pageElement: <NotFoundPage />,
    },
    {
      id: "-2",
      path: "*",
      pageElement: <Navigate to="/not-found" replace={true} />,
    },
  ],
};

export const authorizedStructure = {
  paths: [
    ...dashboardPages,
    {
      id: "0",
      path: "/",
      pageElement: <Navigate to="dashboard/articles" replace={true} />,
    },
    {
      id: "-1",
      path: "/not-found",
      pageElement: <NotFoundPage />,
    },
    {
      id: "-2",
      path: "*",
      pageElement: <Navigate to="/not-found" replace={true} />,
    },
  ],
};

export type RouteType = { id: string; path: string; pageElement: JSX.Element };
