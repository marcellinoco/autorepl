// components/wiki/ArticleList.tsx

import { FC } from "react";
import { ArticleListProps } from "@/models/wiki";
import ArticleItem from "./ArticleItem";
import { Separator } from "@radix-ui/react-separator";
import { SquarePen } from 'lucide-react';


const ArticleList: FC<ArticleListProps> = ({ articles, onEdit, onCreate }) => {
  return (
    <div>
      <div className="flex items-center gap-5 pl-5">
        <h1 className="text-xl font-bold">Wiki</h1>
        <SquarePen onClick={onCreate} />
      </div>
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
