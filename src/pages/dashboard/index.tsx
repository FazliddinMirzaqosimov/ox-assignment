import { RouteType } from "pages";
import QuizPage from "./QuizPage";
import SectionPage from "./SectionPage";
import UserPage from "./UserPage";

export const dashboardPages: RouteType[] = [
  {
    id: "1",
    path: "/dashboard/tests",
    pageElement: <QuizPage />,
  },
  {
    id: "2",
    path: "/dashboard/topics",
    pageElement: <SectionPage />,
  },
  {
    id: "3",
    path: "/dashboard/users",
    pageElement: <UserPage />,
  },
];
