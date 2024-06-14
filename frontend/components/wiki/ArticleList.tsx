// components/wiki/ArticleList.tsx

import { FC } from "react";
import ArticleItem from "./ArticleItem";
import { ArticleListProps } from "@/models/wiki";

const ArticleList: FC<ArticleListProps> = ({ articles, onEdit, onCreate }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Wiki</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={onCreate}
      >
        New Article
      </button>
      <ul>
        {articles.map((article) => (
          <ArticleItem key={article.url} article={article} onEdit={onEdit} />
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
