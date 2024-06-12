import SignInEmail from "@/components/form/AuthForm/SignIn/SignInEmail";
import OauthSignIn from "@/components/form/AuthForm/SignIn/SignInGoogle";
import SignInPage from "@/components/form/AuthForm/SignIn/SigninForm";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return<div className="">
   <SignInEmail />;
   <OauthSignIn />
  </div>
}