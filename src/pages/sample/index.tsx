import { RouteType } from "pages";
import React from "react";
import HomePage from "./HomePage";
import SectionPage from "./SectionPage";
import TestPage from "./TestPage";

export const samplePages: RouteType[] = [
  {
    id: "1",
    path: "/sample/home",
    pageElement: <HomePage />,
  },
  {
    id: "2",
    path: "/sample/tests/:topic",
    pageElement: <TestPage />,
  },
  {
    id: "3",
    path: "/sample/topics",
    pageElement: <SectionPage />,
  },
];
