"use server";

import { User } from "@/models/model";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(
  email: string,
  password: string
): Promise<{ accessToken: string; user: User }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      accessToken: string;
    }>("/api/auth/signin", { email, password });

    cookies().set("accessToken", data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function google(
  token: string
): Promise<{ accessToken: string; user: User }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      accessToken: string;
    }>("/api/auth/google", { token });

    cookies().set("accessToken", data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signup(
  email: string,
  name: string,
  password: string
): Promise<{ accessToken: string; user: User }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      accessToken: string;
    }>("/api/auth/signup", { email, password, name });

    cookies().set("accessToken", data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  "use server";
  cookies().delete("accessToken");
  redirect("/auth");
}
