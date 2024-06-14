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
      const { access_token, user } = await signin(
        values.email,
        values.password
      );
      successfullyLoginHandler(user, access_token);
    } catch (err: any) {}
    setSubmitting(false);
  };

  const signInWithGoogleHandler = useGoogleLogin({
    onSuccess: async ({ access_token: googleToken }) => {
      try {
        const { access_token, user } = await google(googleToken);
        successfullyLoginHandler(user, access_token);
      } catch (err: any) {}
    },
    onError: () => {},
    flow: "implicit",
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
      {/* Header */}
      <CardHeader>
        <div className="mt-5 flex flex-col space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your email below to login into your account
          </CardDescription>
        </div>
      </CardHeader>

      {/* Body */}
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="grid gap-6">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={signInWithCredentialHandler}
            validationSchema={SigninSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <label
                      className="sr-only text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      id="email"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="name@example.com"
                      type="email"
                    />
                    <div className="px-4 text-xs text-red-500">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <label
                      className="sr-only text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Field
                      name="password"
                      id="password"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="password"
                      type="password"
                    />
                    <div className="px-4 text-xs text-red-500">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <Button
                    disabled={isSubmitting}
                    className="disable:cursor-not-allowed inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        />
                        <span>Loading...</span>
                      </>
                    ) : (
                      "Sign In with Email"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
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

      {/* Footer */}
      <CardFooter>
        <div className="w-full px-8 mt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer underline underline-offset-4 hover:text-primary"
            onClick={() => {
              document.getElementById("sign-up-trigger")?.click();
            }}
          >
            Signup
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

SignIn.displayName = "Sign In";
export default SignIn;
