// components/wiki/ArticleList.tsx

import { FC } from "react";
import { ArticleListProps } from "@/models/wiki";
import ArticleItem from "./ArticleItem";
import { Separator } from "@radix-ui/react-separator";

const ArticleList: FC<ArticleListProps> = ({ articles, onEdit, onCreate }) => {
  return (
    <div>
      <h2 className="text-xl font-bold ">Wiki</h2>
      <Separator className="my-4" />
      <ul>
        {articles.map((article) => (
          <ArticleItem key={article.id} article={article} onEdit={onEdit} />
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
