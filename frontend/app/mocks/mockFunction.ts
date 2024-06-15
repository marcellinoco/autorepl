// mocks/mockFunctions.ts

import { Chat, User, RelatedHistory } from "@/models/model";
import { mockChats, mockUser, mockRelatedHistory } from "./mock"

export async function getChatsDetails(uid: string): Promise<{
  chats: Chat[];
  user: User;
}> {
  return new Promise((resolve) => {
    resolve({ chats: mockChats, user: mockUser });
  });
}

export async function getRelatedHistory(): Promise<{
  relatedHistory: RelatedHistory[];
}> {
  return new Promise((resolve) => {
    resolve({ relatedHistory: mockRelatedHistory });
  });
}
