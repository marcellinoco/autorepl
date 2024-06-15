"use client";

import { logout } from "@/app/auth/action";
import useAuthStore from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect } from "react";
import { getRelatedHistory } from "@/app/mocks/mockFunction";
import { RelatedHistory } from "@/models/model";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const RelatedSidebar: FC = () => {
  const { user, clear } = useAuthStore();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [relatedHistory, setRelatedHistory] = useState<RelatedHistory[]>([]);

  useEffect(() => {
    const fetchRelatedHistory = async () => {
      const { relatedHistory } = await getRelatedHistory();
      setRelatedHistory(relatedHistory);
    };
    fetchRelatedHistory();
  }, []);

  if (pathname.includes("/auth")) {
    return <></>;
  }

  const filteredHistory = relatedHistory.filter(
    (item) => selectedCategory === "all" || item.categories === selectedCategory
  );

  return (
    <div
      className={`overflow-hidden h-screen transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="h-[52px] flex items-center px-5 justify-between">
        <button
          className="text-xl font-bold"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "☰" : "✕"}
        </button>
      </div>
      <div className="shrink-0 bg-border h-[1px] w-full"></div>
      <div
        className={cn(
          "group flex flex-col justify-center pt-4 px-[20px]",
          isCollapsed && "hidden"
        )}
      >
        <div className="text-lg md:text-xl font-bold line-clamp-1">
          Related Contents
        </div>
      </div>

      <div
        className={`group flex flex-col gap-4 py-4 ${
          isCollapsed ? "items-center" : "px-[20px]"
        } flex-grow`}
      >{ !isCollapsed && (
        <Tabs
          defaultValue="all"
          className="mb-4"
          onValueChange={setSelectedCategory}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="wiki">Wiki</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {filteredHistory.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer p-4 border rounded-md"
                onClick={() => (window.location.href = item.url)}
              >
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm">{item.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="wiki">
            {filteredHistory.map(
              (item, index) =>
                item.categories === "wiki" && (
                  <div
                    key={index}
                    className="cursor-pointer p-4 border rounded-md"
                    onClick={() => (window.location.href = item.url)}
                  >
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-sm">{item.content}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                )
            )}
          </TabsContent>
          <TabsContent value="chat">
            {filteredHistory.map(
              (item, index) =>
                item.categories === "chat" && (
                  <div
                    key={index}
                    className="cursor-pointer p-4 border rounded-md"
                    onClick={() => (window.location.href = item.url)}
                  >
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-sm">{item.content}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                )
            )}
          </TabsContent>
        </Tabs>
)}
      </div>
    </div>
  );
};

RelatedSidebar.displayName = "Sidebar";
export default RelatedSidebar;
