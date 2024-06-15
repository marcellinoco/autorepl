// components/wiki/ArticleItem.tsx

import { FC } from "react";
import { ArticleItemProps } from "@/models/wiki";

const ArticleItem: FC<ArticleItemProps> = ({ article, onEdit }) => {
  return (
    <li className="shadow-md rounded-lg p-5 mb-4 cursor-pointer hover:bg-gray-100 transition-all duration-300" onClick={() => onEdit(article)}>
      <div>
        <h3 className="text-lg font-bold mb-2">{article.title}</h3>
        {article.categories && <p className="text-sm text-gray-600">{article.categories.join(", ")}</p>}
      </div>
    </li>
  );
};

export default ArticleItem;
