import React from "react";
import { AiFillStop } from "react-icons/ai";

export type MenuRoutesType = {
  id: string | number;
  name: string;
  type: string;
  children: ChildrenType[];
};
export type ChildrenType = {
  id: string | number;
  link: string;
  title: string;
  icon: JSX.Element;
};

export const userMenuRoutes: MenuRoutesType[] = [
  {
    id: "user",
    type: "group",
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
        link: "/sample/topics",
        title: "Test Page",
        icon: <AiFillStop />,
      },
    ],
  },
];
export const adminMenuRoutes: MenuRoutesType[] = [
  {
    id: "user",
    type: "group",
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
        link: "/sample/topics",
        title: "Test Page",
        icon: <AiFillStop />,
      },
    ],
  },
  {
    id: "admin",
    type: "group",
    name: "Admin pages",
    children: [
      {
        id: "3",
        link: "/dashboard/topics",
        title: "Topics Page",
        icon: <AiFillStop />,
      },
      {
        id: "4",
        link: "/dashboard/tests",
        title: "Tests Page",
        icon: <AiFillStop />,
      },
      {
        id: "5",
        link: "/dashboard/users",
        title: "Users Page",
        icon: <AiFillStop />,
      },
    ],
  },
];
