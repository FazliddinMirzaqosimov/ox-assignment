import { RouteType } from "pages";
import SignInPage from "./SignInPage";

export const authPages: RouteType[] = [
  {
    id: "1",
    path: "/auth/signin",
    pageElement: <SignInPage />,
  },
];
