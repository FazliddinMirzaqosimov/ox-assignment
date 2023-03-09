import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

export const authPages: { path: string; pageElement: React.FC }[] = [
  {
    path: "auth/signin",
    pageElement: SignInPage,
  },
  {
    path: "auth/signup",
    pageElement: SignUpPage,
  },
];
