"use client";

import { useState } from "react";
import ArticleList from "@/components/wiki/ArticleList";
// import ArticleEditor from "@/components/wiki/ArticleEditor";
import { ArticleSection } from "@/models/wiki";
import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";

const ArticleEditor = dynamic(() => import("@/components/wiki/ArticleEditor"), {
  ssr: false,
});

const initialArticles: ArticleSection[] = [
  // Example data, replace with actual data fetching logic
  {
    id: "1",
    createdAt: new Date(),
    title: "Tokopedia Help Center",
    categories: ["Help", "Tokopedia"],
    content: "This is the content of the Tokopedia Help Center article.",
  },
  {
    id: "2",
    createdAt: new Date(),
    title: "Tokopedia Help",
    categories: ["Help"],
    content: "This is the content of test test Help Center article.",
  },
  {
    id: "3",
    createdAt: new Date(),
    title: "Tokopediu",
    categories: ["boomer", "wow"],
    content: " is the  of test test Help  article.",
  },
];

const WikiPage = () => {
  const [editingArticle, setEditingArticle] = useState<ArticleSection | null>(
    null
  );
  const [articles, setArticles] = useState<ArticleSection[]>(initialArticles);

  const handleEdit = (article: ArticleSection) => {
    setEditingArticle(article);
  };

  const handleCreate = () => {
    setEditingArticle({
      id: "",
      createdAt: new Date(),
      title: "",
      categories: [],
      content: "",
    });
  };

  const handleSave = (article: ArticleSection) => {
    if (article.id) {
      // Update existing article
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? article : a))
      );
    } else {
      // Create new article
      setArticles((prev) => [...prev, { ...article, id: `${Date.now()}` }]);
    }
    setEditingArticle(null);
  };

  const handleCancel = () => {
    setEditingArticle(null);
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen overflow-scroll">
      <div className="w-full lg:w-1/3 border-r p-4">
        <ArticleList
          articles={articles}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      </div>
      <div className="w-full lg:w-2/3 p-4">
        {editingArticle ? (
          <ArticleEditor
            article={editingArticle}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an article or create a new one
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiPage;
