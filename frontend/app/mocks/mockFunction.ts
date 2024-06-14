// mocks/mockFunctions.ts

import { History, Chat, User } from "@/models/model";
import { mockHistories, mockChats, mockUser } from "./mock"

export async function getHistory(): Promise<{
  histories: History[];
}> {
  return new Promise((resolve) => {
    resolve({ histories: mockHistories });
  });
}

export async function getChatsDetails(uid: string): Promise<{
  chats: Chat[];
  user: User;
}> {
  return new Promise((resolve) => {
    resolve({ chats: mockChats, user: mockUser });
  });
}
