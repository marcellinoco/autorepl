// action.ts

"use server";

import { Chat, History, User } from "@/models/model";
import { cookies } from "next/headers";

// Import mock functions for testing
import {
  getHistory as mockGetHistory,
  getChatsDetails as mockGetChatsDetails,
} from "./mocks/mockFunction";

export async function getHistory(): Promise<{
  histories: History[];
}> {
  "use server";
  try {
    // Uncomment the following lines when not testing
    // const accessToken = cookies().get("access_token")?.value;
    // const { data } = await serverAxios.get<{
    //   histories: History[];
    // }>("/api/chats/histories", {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // });

    // Mocked response for testing
    const data = await mockGetHistory();

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
