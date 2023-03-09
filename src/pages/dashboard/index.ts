import QuizPage from "./QuizPage";
import SectionPage from "./SectionPage";
import UserPage from "./UserPage";

export const dashboardPages: { path: string; pageElement: React.FC }[] = [
  {
    path: "dashboard/quizes",
    pageElement: QuizPage,
  },
  {
    path: "dashboard/sections",
    pageElement: SectionPage,
  },
  {
    path: "dashboard/users",
    pageElement: UserPage,
  },
];
