"use server";

import { User } from "@/models/model";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(
  email: string,
  password: string
): Promise<{ access_token: string; user: User }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      access_token: string;
    }>("/api/auth/signin", { email, password });

    cookies().set("access_token", data.access_token);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function google(
  token: string
): Promise<{ access_token: string; user: User }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      access_token: string;
    }>("/api/auth/google", { token });

    cookies().set("access_token", data.access_token);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signup(
  email: string,
  name: string,
  password: string
): Promise<{ access_token: string; user: User }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      access_token: string;
    }>("/api/auth/signup", { email, password, name });

    cookies().set("access_token", data.access_token);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  "use server";
  cookies().delete("access_token");
  redirect("/auth");
}
