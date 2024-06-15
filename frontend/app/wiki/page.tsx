"use client";

import { useState } from "react";
import ArticleList from "@/components/wiki/ArticleList";
import dynamic from "next/dynamic";
import { ArticleSection } from "@/models/wiki";

const ArticleEditor = dynamic(() => import("@/components/wiki/ArticleEditor"), {
  ssr: false,
});

const initialArticles: ArticleSection[] = [
  {
    id: "1",
    createdAt: new Date(),
    title: "Tokopedia Help Center",
    categories: ["Help", "Electronic"],
    content: "Help with lost iPhone",
  },
  {
    id: "2",
    createdAt: new Date(),
    title: "Tokopedia Help",
    categories: ["Help", "Account"],
    content: "Account got blocked by Tokopedia team",
  },
  {
    id: "3",
    createdAt: new Date(),
    title: "Tokopediu",
    categories: ["Order", "Shoes"],
    content: "Shoes is gone on the way to buyer.",
  },
];

const WikiPage = () => {
  const [editingArticle, setEditingArticle] = useState<ArticleSection | null>(null);
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
      setArticles((prev) => prev.map((a) => (a.id === article.id ? article : a)));
    } else {
      setArticles((prev) => [...prev, { ...article, id: `${Date.now()}` }]);
    }
    setEditingArticle(null);
  };

  const handleCancel = () => {
    setEditingArticle(null);
  };

  return (
    <div className="flex flex-col lg:flex-row w-9/12 h-screen overflow-hidden">
      <div className="w-full lg:w-1/3">
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
