import { RouteType } from "pages";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

export const authPages: RouteType[] = [
  {
    id: "1",
    path: "/auth/signin",
    pageElement: <SignInPage />,
  },
  {
    id: "2",
    path: "/auth/signup",
    pageElement: <SignUpPage />,
  },
];
