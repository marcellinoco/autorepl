// mocks/mockData.ts

import { User, History, Chat, RelatedHistory } from "@/models/model";
import { create } from "domain";

export const mockUser: User = {
  avatar: "https://example.com/avatar.jpg",
  created_at: "2023-01-01T00:00:00Z",
  email: "user@example.com",
  uid: "user-123",
  name: "John Doe",
  provider: "google",
};

export const mockHistories: History[] = [
  {
    id: "history-1",
    latest_content: "Hello there!",
    latest_created_at: "2023-06-14T23:00:00Z",
    receiver_name: "Jane Smith",
    receiver_uid: "user-456",
    sender_name: "John Doe",
    sender_uid: "user-123",
  },
  {
    id: "history-2",
    latest_content: "How are you?",
    latest_created_at: "2023-06-14T12:05:00Z",
    receiver_name: "Jane Smith",
    receiver_uid: "user-456",
    sender_name: "John Doe",
    sender_uid: "user-123",
  },  

];

export const mockChats: Chat[] = [
  {
    content: "Hello there!",
    created_at: "2023-06-14T12:00:00Z",
    id: "chat-1",
    receiver: mockUser,
    receiver_uid: "user-456",
    sender: mockUser,
    sender_uid: "user-123",
  },
  {
    content: "How are you?",
    created_at: "2023-06-14T12:05:00Z",
    id: "chat-2",
    receiver: mockUser,
    receiver_uid: "user-456",
    sender: mockUser,
    sender_uid: "user-123",
  },
];

export const mockRelatedHistory: RelatedHistory[] = [
  {
    categories: "wiki",
    title: "title",
    content: "content",
    createdAt: new Date("2023-06-14T12:00:00Z"),
    url: "https://example.com",
  },
  {
    categories: "wiki",
    title: "title",
    content: "content",
    createdAt: new Date(),
    url: "https://example.com",
  },
];