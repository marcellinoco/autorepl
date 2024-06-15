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
  latest_content: string;
  latest_created_at: string;
  receiver_name: string;
  receiver_uid: string;
  sender_name: string;
  sender_uid: string;
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
}

export interface Mail {
  id: string,
  from: string,
  date: Date,
  subject: string,
  content: string,
}