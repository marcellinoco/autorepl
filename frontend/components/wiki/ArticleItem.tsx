// components/wiki/ArticleItem.tsx

import { FC } from "react";
import { ArticleItemProps } from "@/models/wiki";


const ArticleItem: FC<ArticleItemProps> = ({ article, onEdit }) => {
  return (
    <li className="border-b py-2 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{article.title}</h3>
        {article.content && <p>{article.content.substring(0, 100)}...</p>}
      </div>
      <button
        className="bg-green-500 text-white py-1 px-3 rounded"
        onClick={() => onEdit(article)}
      >
        Edit
      </button>
    </li>
  );
};

export default ArticleItem;
