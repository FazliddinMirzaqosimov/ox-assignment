import { authorizedStructure, RouteType, unAuthorizedStructure } from "pages";
import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import { useJWTAuth } from "../../auth/jwt-auth/JWTAuthAuthProvider";

const useGetRoutes = () => {
  const { isAuthenticated } = useJWTAuth();

  const routes = isAuthenticated ? authorizedStructure : unAuthorizedStructure;
  return routes;
};

function RouteGenerator() {
  const routes = useGetRoutes();

  return (
    <>
      <Routes>
        {routes.paths.map(({ id, path, pageElement }: RouteType) => {
          return <Route key={id} path={path} element={pageElement}></Route>;
        })}
      </Routes>
    </>
  );
}

export default RouteGenerator;
