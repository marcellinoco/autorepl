"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import GoogleLogo from "./google-logo";
import { FC } from "react";
import useAuthStore from "@/store/useAuthStore";
import { google, signin } from "@/app/auth/action";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "@/models/model";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("email is not valid").required("email is required"),
  password: Yup.string()
    .min(8, "password should have at least 8 character length")
    .matches(/[a-z]/, "password must include lowercase characters")
    .matches(/[A-Z]/, "password must include uppercase characters")
    .matches(/[0-9]/, "password must include a number")
    .required("password is required"),
});

const SignIn: FC = () => {
  const router = useRouter();
  const { setAccessToken, setUser } = useAuthStore();
  const signInWithCredentialHandler = async (
    values: LoginForm,
    { setSubmitting }: FormikHelpers<LoginForm>
  ) => {
    setSubmitting(true);
    try {
      const { accessToken, user } = await signin(
        values.email,
        values.password
      );
      successfullyLoginHandler(user, accessToken);
    } catch (err: any) {}
    setSubmitting(false);
  };

  const signInWithGoogleHandler = useGoogleLogin({
    onSuccess: async ({ access_token: googleToken }) => {
      try {
        const { accessToken, user } = await google(googleToken);
        successfullyLoginHandler(user, accessToken);
      } catch (err: any) {}
    },
    onError: () => {},
    flow: "implicit",
    scope: "https://www.googleapis.com/auth/gmail.readonly",
  });

  const successfullyLoginHandler = (user: User, accessToken: string) => {
    setUser({
      name: user.name,
      id: user.uid,
      email: user.email,
      image: user.avatar,
    });
    setAccessToken(accessToken);
    router.push("/");
  };

  return (
    <Card>
      <CardHeader>
        <div className="mt-5 flex flex-col space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome to Autorepl.AI
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to your Google account to get started!
          </CardDescription>
        </div>
      </CardHeader>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="grid gap-6">
          <Button
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            variant="outline"
            onClick={() => signInWithGoogleHandler()}
          >
            <GoogleLogo className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </div>
      <CardFooter>
        <div className="w-full px-8 mt-2 text-center text-sm text-muted-foreground">
        </div>
      </CardFooter>
    </Card>
  );
};

SignIn.displayName = "Sign In";
export default SignIn;
