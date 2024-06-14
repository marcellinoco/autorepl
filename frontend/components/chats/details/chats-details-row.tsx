import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Chat, User } from "@/models/model";
import { formatIsoDate } from "@/utils/formatIsoDate";
import { getUserFallbackHandler } from "@/utils/getUserFallback";
import { FC } from "react";

interface ChatsDetailsRowProps {
  chat: Chat;
  activeUser: User | null;
}

const ChatsDetailsRow: FC<ChatsDetailsRowProps> = ({ activeUser, chat }) => {
  const isMyFriend = () => {
    return activeUser?.uid === chat.sender_uid;
  };
  return (
    <div
      className={`w-full flex items-start pt-4 ${
        isMyFriend() ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[95%] flex gap-2 px-4 ${
          !isMyFriend() && "flex-row-reverse"
        }`}
      >
        {isMyFriend() && (
          <Avatar>
            <AvatarImage src={activeUser?.avatar} />
            <AvatarFallback>
              {getUserFallbackHandler(activeUser?.name)}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${
            isMyFriend() ? "bg-[#06C755] text-[#FFF]" : "bg-[#DDD]"
          }`}
        >
          {chat.content}
        </div>
        <div className="text-xs flex items-end">
          {formatIsoDate(chat.created_at)}
        </div>
      </div>
    </div>
  );
};

ChatsDetailsRow.displayName = "ChatsDetailsRow";
export default ChatsDetailsRow;
