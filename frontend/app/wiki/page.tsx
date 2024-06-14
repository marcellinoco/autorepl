"use client";

import { useState } from "react";
import ArticleList from "@/components/wiki/ArticleList";
import ArticleEditor from "@/components/wiki/ArticleEditor";
import { ArticleSection } from "@/models/wiki";

const initialArticles: ArticleSection[] = [
  // Example data, replace with actual data fetching logic
  {
    title: "Tokopedia Help Center",
    url: "https://www.tokopedia.com/help",
    sections: [
      {
        title: "Pembeli",
        url: "https://www.tokopedia.com/help",
        sections: [
          {
            title: "Akun Saya",
            url: "https://www.tokopedia.com/help/browse/t-0054-akun-saya",
            sections: [
              {
                title: "Jaga Keamanan Akun Tokopedia",
                url: "https://www.tokopedia.com/help/article/t-0054-jaga-keamanan-akun-tokopedia",
                content:
                  "Perhatian! Kedepannya, apabila Toppers telah menerima alamat link tertentu yang mengaku dari Tokopedia maupun pihak lain, mohon untuk memastikan dua hal berikut ini: ...",
              },
            ],
          },
        ],
      },
    ],
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
    setEditingArticle({ title: "", url: "", content: "", sections: [] });
  };

  const handleSave = (article: ArticleSection) => {
    if (article.url) {
      // Update existing article
      setArticles((prev) =>
        prev.map((a) => (a.url === article.url ? article : a))
      );
    } else {
      // Create new article
      setArticles((prev) => [
        ...prev,
        { ...article, url: `${Date.now()}` }, // Assign a unique URL or ID
      ]);
    }
    setEditingArticle(null);
  };

  const handleCancel = () => {
    setEditingArticle(null);
  };

  return (
    <div>
      {editingArticle ? (
        <ArticleEditor
          article={editingArticle}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ArticleList
          articles={articles}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
};

export default WikiPage;
