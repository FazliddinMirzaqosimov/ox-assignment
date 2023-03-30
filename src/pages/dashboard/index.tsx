import { RouteType } from "pages";
import QuizPage from "./Category";
import NewsPage from "./ArticlePage";
import SectionPage from "./Product";
import UserPage from "./UserPage";

export const dashboardPages: RouteType[] = [
  {
    id: "1",
    path: "/dashboard/categories",
    pageElement: <QuizPage />,
  },
  {
    id: "2",
    path: "/dashboard/products",
    pageElement: <SectionPage />,
  },
  {
    id: "3",
    path: "/dashboard/admins",
    pageElement: <UserPage />,
  },
  {
    id: "4",
    path: "/dashboard/articles",
    pageElement: <NewsPage />,
  },
];
