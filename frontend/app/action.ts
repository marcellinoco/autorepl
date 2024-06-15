// action.ts
"use server";

import { Chat, EmailMessage, History, User } from "@/models/model";
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

export async function getChatsDetails(threadId: string): Promise<{
  messages: EmailMessage[];
}> {
  "use server";
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const { data } = await serverAxios.post<{
      messages: EmailMessage[];
    }>(
      "/api/emails/threads",
      {
        threadId: threadId,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    let e = data.messages.map((message) => {
      return { ...message, from: message.from.split(" <")[0] };
    });
    data.messages = e;
    return data;

    return data;
  } catch (error) {
    console.error("Error in getChatsDetails:", error);
    throw error;
  }
}
