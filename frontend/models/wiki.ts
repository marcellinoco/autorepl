import { FC } from "react";
import { User } from "./model";


export type ArticleSection = {
  title: string;
  url: string;
  content?: string;
  sections?: ArticleSection[];
};

export type Article = ArticleSection[];

export interface ArticleItemProps {
  article: ArticleSection;
  onEdit: (article: ArticleSection) => void;
}

export interface ArticleFormProps {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export interface ArticleListProps {
  articles: ArticleSection[];
  onEdit: (article: ArticleSection) => void;
  onCreate: () => void;
}

export interface ArticleFormProps {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export interface ArticleEditorProps {
  article?: ArticleSection;
  onSave: (article: ArticleSection) => void;
  onCancel: () => void;
}
