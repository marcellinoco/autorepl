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
import { FC, useEffect } from "react";
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

  useEffect(() => {
    signInWithGoogleHandler();
  });

  //
  return <></>;
};

SignIn.displayName = "Sign In";
export default SignIn;
