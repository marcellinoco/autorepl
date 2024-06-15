"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Button } from "../ui/button";
import GoogleLogo from "./google-logo";
import { FC } from "react";
import useAuthStore from "@/store/useAuthStore";
import { google, signin } from "@/app/auth/action";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "@/models/model";
import { useRouter } from "next/navigation";
import { ImWhatsapp } from "react-icons/im";


interface LoginForm {
  email: string;
  password: string;
}

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
            Autorepl.AI
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Innovating Seamless Customer Experience through AI
          </CardDescription>
        </div>
      </CardHeader>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="grid gap-3">
          <Button
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-105"
            variant="outline"
            onClick={() => signInWithGoogleHandler()}
          >
            <GoogleLogo className="mr-2 h-4 w-4" />
            GMail
          </Button>
          <Button
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-105"
            variant="outline"
            onClick={() => signInWithGoogleHandler()}
          >
            <ImWhatsapp color="green" className="mr-1 h-4 w-4" />
            WhatsApp
          </Button>
          <Button
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-105"
            variant="outline"
            onClick={() => signInWithGoogleHandler()}
          >
            OneReplAI Account (Beta)
          </Button>
        </div>
      </div>
      <CardFooter>
        <div className="w-full px-8 mt-2 text-center text-sm text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
};

SignIn.displayName = "Sign In";
export default SignIn;
