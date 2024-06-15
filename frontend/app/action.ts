// action.ts
"use server";

import { Chat, History, User } from "@/models/model";
import { cookies } from "next/headers";

import { getChatsDetails as mockGetChatsDetails } from "./mocks/mockFunction";
import { serverAxios } from "@/utils/axios";

export async function getHistory(): Promise<{
  emails: History[];
}> {
  "use server";
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const { data } = await serverAxios.post<{
      emails: History[];
    }>(
      "/api/emails",
      {
        maxResults: 5,
        pageToken: "",
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    let e = data.emails.map((email) => {
      return { ...email, from: email.from.split(" <")[0] };
    });
    data.emails = e;
    return data;
  } catch (error) {
    console.error("Error in getHistory:", error);
    throw error;
  }
}

export async function getChatsDetails(uid: string): Promise<{
  chats: Chat[];
  user: User;
}> {
  "use server";
  try {
    // Uncomment the following lines when not testing
    // const accessToken = cookies().get("access_token")?.value;
    // const { data } = await serverAxios.get<{
    //   chats: Chat[];
    //   user: User;
    // }>(`/api/chats/${uid}`, {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // });

    // Mocked response for testing
    const data = await mockGetChatsDetails(uid);

    return data;
  } catch (error) {
    console.error("Error in getChatsDetails:", error);
    throw error;
  }
}
