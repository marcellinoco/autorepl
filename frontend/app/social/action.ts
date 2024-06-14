"use server";

import { User } from "@/models/model";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export async function getSocial(): Promise<{
  users: User[];
}> {
  "use server";
  try {
    const accessToken = cookies().get("access_token")?.value;
    const { data } = await serverAxios.get<{
      users: User[];
    }>("/api/users", { headers: { Authorization: `Bearer ${accessToken}` } });
    return data;
  } catch (error) {
    throw error;
  }
}
