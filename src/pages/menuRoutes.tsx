import React from "react";
import { AiFillStop } from "react-icons/ai";

type MenuRoutesType = {
  id: string | number;
  name: string;
  children: {
    id: string | number;
    link: string;
    title: string;
    icon: JSX.Element;
  }[];
};

export const userMenuRoutes: MenuRoutesType[] = [
  {
    id: "user",
    name: "User pages",
    children: [
      {
        id: "1",
        link: "/sample/home",
        title: "Home Page",
        icon: <AiFillStop />,
      },
      {
        id: "2",
        link: "/sample/quiz",
        title: "Test Page",
        icon: <AiFillStop />,
      },
    ],
  },
];
export const adminMenuRoutes: MenuRoutesType[] = [
  {
    id: "user",
    name: "User pages",
    children: [
      {
        id: "1",
        link: "/sample/home",
        title: "Home Page",
        icon: <AiFillStop />,
      },
      {
        id: "2",
        link: "/sample/quiz",
        title: "Test Page",
        icon: <AiFillStop />,
      },
    ],
  },
  {
    id: "admin",
    name: "Admin pages",
    children: [
      {
        id: "1",
        link: "/dashboard/sections",
        title: "Sections Page",
        icon: <AiFillStop />,
      },
      {
        id: "2",
        link: "/dashboard/tests",
        title: "Tests Page",
        icon: <AiFillStop />,
      },
      {
        id: "3",
        link: "/dashboard/users",
        title: "Users Page",
        icon: <AiFillStop />,
      },
    ],
  },
];
