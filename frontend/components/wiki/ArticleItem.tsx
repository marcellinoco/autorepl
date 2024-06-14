// components/wiki/ArticleItem.tsx

import { FC } from "react";
import { ArticleItemProps } from "@/models/wiki";

const ArticleItem: FC<ArticleItemProps> = ({ article, onEdit }) => {
  return (
    <li className="border-b py-2 flex justify-between items-cente cursor-pointer hover:bg-accent rounded-sm p-5" onClick={() => onEdit(article)}>
      <div>
        <h3 className="text-lg font-bold">{article.title}</h3>
        {article.categories && <p>{article.categories.join(", ")}</p>}
      </div>
    </li>
  );
};

export default ArticleItem;
