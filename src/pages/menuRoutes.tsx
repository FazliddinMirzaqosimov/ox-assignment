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

export const adminMenuRoutes: MenuRoutesType[] = [
  {
    id: "admin",
    type: "group",
    name: "Admin pages",
    children: [
     
      {
        id: "5",
        link: "/dashboard/products",
        title: "Products",
        icon: <AiFillStop />,
      },
    ],
  },
];
