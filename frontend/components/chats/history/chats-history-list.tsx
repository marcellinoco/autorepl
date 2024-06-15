import { FC, useEffect, useState, useRef, useCallback } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { History, User } from "@/models/model";
import ChatsHistoryRow from "./chats-history-row";
import useAuthStore from "@/store/useAuthStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface ChatsHistoryListProps {
  histories: History[] | null;
  onChatHistoryRowClicked: (uid: string) => void;
}

const ChatsHistoryList: FC<ChatsHistoryListProps> = ({
  histories,
  onChatHistoryRowClicked,
}) => {
  const { user } = useAuthStore();
  const [friends, setFriends] = useState<User[] | null>(null);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [curHistory, setCurHistory] = useState<History[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const itemsPerPage = 10;
  const page = useRef(0);

  const getUser = async () => {
    // const { users } = await getSocial();
    setFriends([]);
  };

  useEffect(() => {
    getUser();
  }, []);

  const fetchMoreData = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    const startIndex = page.current * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const newHistories = histories?.slice(startIndex, endIndex) || [];
    if (newHistories.length > 0) {
      setCurHistory((prev) => [...prev, ...newHistories]);
      page.current += 1;
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, [loading, hasMore, histories]);

  useEffect(() => {
    if (searchValue.trim().length) {
      const sv = searchValue.toLowerCase();
      const filteredHistories = histories?.filter((history) => (
        history.summary.toLowerCase().includes(sv) ||
        history.from.toLowerCase().includes(sv)
      )) || [];

      setCurHistory(filteredHistories);
      setHasMore(filteredHistories.length > itemsPerPage);
      page.current = 1;
    } else {
      setCurHistory(histories?.slice(0, itemsPerPage) || []);
      setHasMore((histories?.length || 0) > itemsPerPage);
      page.current = 1;
    }
  }, [searchValue, histories]);

  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMoreData();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchMoreData]);

  return (
    <div className="relative shrink basis-0 grow-[40] border-x">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Inbox</h1>
          <div className="inline-flex h-9 items-center justify-center rounded-lg p-1 text-muted-foreground ml-auto outline-none">
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
      <div
        className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 m-0"
        style={{ animationDuration: "0s" }}
      >
        <div
          className="relative h-full chat-container overflow-y-scroll max-h-[calc(100vh-120px)]"
          style={{ scrollbarColor: "#CFD8DC", scrollbarWidth: "thin" }}
        >
          <div className="w-full rounded-lg">
            <div className="min-w-full table">
              <div className="flex flex-col gap-2 p-4 pt-4">
                {curHistory?.map((history, index) => (
                  <div
                    key={history?.id}
                    onClick={() => {
                      onChatHistoryRowClicked(history?.id);
                    }}
                    ref={index === curHistory.length - 1 ? lastElementRef : null}
                  >
                    <ChatsHistoryRow history={history} />
                  </div>
                ))}
                {loading && <p>Loading...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChatsHistoryList.displayName = "Chats History List";
export default ChatsHistoryList;
