import React from "react";

export const samplePages: {
  path: string;
  pageElement: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
  {
    path: "sample/home",
    pageElement: React.lazy(() => import("./HomePage")),
  },
  {
    path: "sample/quiz",
    pageElement: React.lazy(() => import("./TestPage")),
  },
];
