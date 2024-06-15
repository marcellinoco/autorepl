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
      <div className="flex flex-1 flex-col">
        <div className="flex gap-2 flex-start items-center p-4 sticky top-0 left-0 w-full h-[52px] text-lg font-semibold bg-[#FFF] z-2">
          {activeUser?.name ?? "Chat Details"}
        </div>
        <div className="shrink-0 bg-border h-[1px] w-full mt-auto" />
        {activeUser ? chatDetail() : emptyState()}
        <div className="p-4 pt-0 sticky bottom-0 z-2 bg-[#FFF]">
          <form>
            <div className="grid gap-4">
              <textarea
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 p-4"
                placeholder={`Reply ${activeUser?.name}...`}
              />
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmitHandler();
                  }}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-custom-secondary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs ml-auto"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatsDetailsList;
