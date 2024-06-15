// mocks/mockData.ts

import { User, History, Chat, RelatedHistory, MailPreview } from "@/models/model";

export const mockUser: User = {
  avatar: "https://example.com/avatar.jpg",
  created_at: "2023-01-01T00:00:00Z",
  email: "user@example.com",
  uid: "user-123",
  name: "John Doe",
  provider: "google",
};

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  NONE = "none",
}

export enum Mood {
  HAPPY = "happy",
  SAD = "sad",
  ANGRY = "angry",
  NEUTRAL = "neutral",
}

export const mockHistories: History[] = [
  {
    id: "history-1",
    summary: "Hello there!",
    date: "2023-06-14T12:00:00Z",
    from: "John Doe",
    products: ["product-1", "product-2", "product-3"],
    priority: Priority.HIGH,
    mood: Mood.ANGRY
  },
  {
    id: "history-2",
    summary: "How are you?",
    date: "2023-06-14T12:05:00Z",
    from: "John Doe",
    products: ["product-1"],
    priority: Priority.MEDIUM,
    mood: Mood.HAPPY
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