// components/wiki/ArticleList.tsx

import { FC, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ArticleListProps } from "@/models/wiki";
import ArticleItem from "./ArticleItem";
import { Separator } from "@radix-ui/react-separator";
import { SquarePen } from 'lucide-react';

const ArticleList: FC<ArticleListProps> = ({ articles, onEdit, onCreate }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    if (searchValue.trim().length) {
      const sv = searchValue.toLowerCase();
      const filtered = articles.filter((article) => 
        article?.title.toLowerCase().includes(sv) || 
        article?.content?.toLowerCase().includes(sv)
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchValue, articles]);

  return (
    <div className="relative flex flex-col h-full border-x">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Wiki</h1>
          <div className="inline-flex h-9 items-center justify-center rounded-lg p-1 text-muted-foreground ml-auto outline-none">
            <SquarePen onClick={onCreate} className="cursor-pointer" />
          </div>
        </div>
        <div className="shrink-0 bg-border h-[1px] w-full"></div>
        <form className="p-4">
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <MagnifyingGlassIcon />
            </div>
            <input
              onChange={(e) => setSearchValue(e.currentTarget.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
              placeholder="Search"
            />
          </div>
        </form>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Separator className="my-4" />
        <ul className="px-4">
          {filteredArticles.map((article) => (
            <div key={article.id} className="mb-4">
              <ArticleItem article={article} onEdit={onEdit} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleList;
