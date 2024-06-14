export type ArticleSection = {
  id: string;
  createdAt: Date;
  title: string;
  categories?: string[];
  content?: string;
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
