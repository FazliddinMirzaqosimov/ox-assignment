import { Navigate } from "react-router-dom";
import { authPages } from "./auth";
import { dashboardPages } from "./dashboard";
import { samplePages } from "./sample";

export const unAuthorizedStructure = {
  paths: [
    ...authPages,
    {
      id: "0",

      path: "/",
      pageElement: <Navigate to="/auth/signin" replace={true} />,
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
  ],
};

export type RouteType = { id: string; path: string; pageElement: JSX.Element };
