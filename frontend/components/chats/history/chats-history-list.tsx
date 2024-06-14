import { FC, useEffect, useState } from "react";
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
import { getSocial } from "@/app/social/action";
import SocialListRow from "@/components/social/social-list/social-list-row";
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
  const [curHistory, setCurHistory] = useState(histories);

  const getUser = async () => {
    // const { users } = await getSocial();
    setFriends([]);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (searchValue.trim().length) {
      let newHistory = histories?.filter((history) => {
        const sv = searchValue.toLowerCase();
        return (
          history.latest_content.toLowerCase().includes(sv) ||
          history.sender_name.toLowerCase().includes(sv) ||
          history.receiver_name.toLocaleLowerCase().includes(sv)
        );
      });

      if (newHistory) {
        setCurHistory(newHistory);
      }
    } else {
      setCurHistory(histories);
    }
  }, [searchValue, histories]);

  return (
    <div className="relative shrink basis-0 grow-[40] border-x">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Inbox</h1>
          <div className="inline-flex h-9 items-center justify-center rounded-lg p-1 text-muted-foreground ml-auto outline-none">
            <Dialog>
              <DialogTrigger
                id="new-msg-trigger"
                className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
              >
                New Message
              </DialogTrigger>
              <DialogContent className="w-fit">
                <DialogHeader>
                  <DialogTitle>Select User</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[500px] h-full flex flex-col gap-2 w-[350px] p-0">
                  {friends?.map((friend, idx) => (
                    <div
                      key={friend.uid}
                      className={`mb-2 mr-4 ${
                        idx === friends.length - 1 && "!mb-0"
                      }`}
                      onClick={() => {
                        document.getElementById("new-msg-trigger")?.click();
                        router.push(
                          `/?uid=${friend?.uid}&name=${friend?.name}`
                        );
                      }}
                    >
                      <SocialListRow user={friend} />
                    </div>
                  ))}
                </ScrollArea>
              </DialogContent>
            </Dialog>
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
                {curHistory?.map((history) => (
                  <div
                    key={history?.id}
                    onClick={() => {
                      onChatHistoryRowClicked(
                        user?.id !== history?.sender_uid
                          ? history?.sender_uid
                          : history?.receiver_uid
                      );
                    }}
                  >
                    <ChatsHistoryRow history={history} />
                  </div>
                )) ?? []}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 m-0"></div>
    </div>
  );
};

ChatsHistoryList.displayName = "Chats History List";
export default ChatsHistoryList;
