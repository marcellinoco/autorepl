export interface User {
  avatar: string;
  created_at: string;
  email: string;
  uid: string;
  name: string;
  provider: string;
}

export interface History {
  id: string;
  summary: string;
  date: string;
  from: string;
  products?: string[];
  priority?: Priority;
  mood?: Mood;
}

export interface Mail {
  id: string;
  from: string;
  date: Date;
  subject: string;
  content: string;
}

export interface Chat {
  content: string;
  created_at: string;
  id: string;
  receiver: User;
  receiver_uid: string;
  sender: User;
  sender_uid: string;
}

export interface RelatedHistory {
  categories: string;
  title: string;
  content: string;
  createdAt: Date;
  url: string;
};

export interface MailPreview {
  id: string,
  summary: string,
  from: string,
  date: Date,
  product: string[],
  priority: string,
  mood: string,
}

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