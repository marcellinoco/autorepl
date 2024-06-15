// components/wiki/ArticleItem.tsx

import { FC } from "react";
import { ArticleItemProps } from "@/models/wiki";

const ArticleItem: FC<ArticleItemProps> = ({ article, onEdit }) => {
  return (
    <li className="flex flex-col items-start gap-2 rounded-lg border p-4 text-left text-sm transition-all hover:bg-accent bg-[#FFF] cursor-pointer shadow-md" onClick={() => onEdit(article)}>
      <div className="flex w-full flex-col gap-1 min-w-[250px]">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">{article.title}</div>
        </div>
        {article.categories && (
          <div className="flex flex-wrap gap-1 mt-2">
            {article.categories.map((category) => (
              <span
                key={category}
                className="bg-gray-500 text-white text-xs leading-none rounded-full px-2 py-1"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="line-clamp-3 text-xs text-muted-foreground mt-2">
        {article.content}
      </div>
    </li>
  );
};

export default ArticleItem;
