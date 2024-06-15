"use client";

import { logout } from "@/app/auth/action";
import useAuthStore from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect } from "react";
import { getRelatedHistory } from "@/app/mocks/mockFunction";
import { RelatedHistory } from "@/models/model";
import { cn } from "@/lib/utils";

const RelatedSidebar: FC = () => {
  const { user, clear } = useAuthStore();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [relatedHistory, setRelatedHistory] = useState<RelatedHistory[]>([]);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
    console.log(`Selected Status: ${status}`);
  };

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
        {!isCollapsed && <h1 className="text-xl font-bold">Related</h1>}
      </div>
      <div className="shrink-0 bg-border h-[1px] w-full"></div>
      <div
        className={cn(
          "group flex flex-col justify-center pt-4 px-[20px]",
          isCollapsed && "hidden"
        )}
      >
        <div className="text-base font-bold line-clamp-1">{user?.name}</div>
        <div className="text-xs overflow-truncate line-clamp-1">
          {user?.email}
        </div>
      </div>

      <div
        className={`group flex flex-col gap-4 py-4 ${
          isCollapsed ? "items-center" : "px-[20px]"
        } flex-grow`}
      >
        {!isCollapsed &&
          relatedHistory.map((item, index) => (
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
      </div>
    </div>
  );
};

RelatedSidebar.displayName = "Sidebar";
export default RelatedSidebar;
