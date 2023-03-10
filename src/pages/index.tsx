import { Navigate } from "react-router-dom";
import { authPages } from "./auth";
import { dashboardPages } from "./dashboard";
import NotFoundPage from "./NotFoundPage";
import { samplePages } from "./sample";

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
      path: "*",
      pageElement: <NotFoundPage />,
    },
  ],
};

export const authorizedStructure = {
  paths: [
    ...dashboardPages,
    ...samplePages,
    {
      id: "0",
      path: "/",
      pageElement: <Navigate to="sample/home" replace={true} />,
    },
    {
      id: "-1",
      path: "*",
      pageElement: <NotFoundPage />,
    },
  ],
};

export type RouteType = { id: string; path: string; pageElement: JSX.Element };
