import { Chat, User } from "@/models/model";
import { FC, useState } from "react";
import ChatsDetailsRow from "./chats-details-row";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";

interface ChatsDetailsListProps {
  chats: Chat[] | null;
  activeUser: User | null;
  sendMessage: (data: any) => void;
}

const ChatsDetailsList: FC<ChatsDetailsListProps> = ({
  chats,
  activeUser,
  sendMessage,
}) => {
  const [value, setValue] = useState("");
  const { user } = useAuthStore();

  const onSubmitHandler = () => {
    if (value.trim().length) {
      const data = {
        content: value,
        sender_uid: user?.id,
        receiver_uid: activeUser?.uid,
      };

      sendMessage(data);
      setValue("");
    }
  };

  const chatDetail = () => (
    <div
      className="h-[calc(100vh-190px)] overflow-y-scroll flex flex-col-reverse pb-4"
      style={{ scrollbarColor: "#CFD8DC #FFF", scrollbarWidth: "thin" }}
    >
      {chats?.map((chat) => (
        <div key={chat.id}>
          <ChatsDetailsRow chat={chat} activeUser={activeUser} />
        </div>
      ))}
    </div>
  );

  const emptyState = () => (
    <div className="h-[calc(100vh-190px)] flex flex-col items-center justify-center">
      <Image src={"/img/asset-empty.png"} width={500} height={500} alt="" />
      <div className="text-base font-bold">
        Click on Inbox to See Your Chat ^^
      </div>
    </div>
  );

  return (
    <div className="flex h-full max-h-screen flex-col w-1/2 relative">
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 flex-start items-center p-4 sticky top-0 left-0 w-full h-[52px] text-lg font-semibold bg-[#FFF] z-2">
          {activeUser?.name ?? "Chat Details"}
        </div>
        <div className="shrink-0 bg-border h-[1px] w-full" />
          {activeUser ? chatDetail() : emptyState()}
        </div>
        <div className="p-4 bg-[#FFF] sticky bottom-0 w-full my-auto">
          <form>
            <div className="flex flex-row items-center justify-between">
              <input
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                className="flex min-h-[40px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 p-2"
                placeholder={`Reply ${activeUser?.name}...`}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitHandler();
                }}
                className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-primary-foreground shadow hover:bg-primary/80 h-[40px] rounded-lg px-3 ml-2"
              >
                <p className="font-medium text-sm md:text-base mr-2">Send</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default ChatsDetailsList;
