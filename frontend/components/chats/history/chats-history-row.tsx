import { History } from "@/models/model";
import useAuthStore from "@/store/useAuthStore";
import { formatIsoDate } from "@/utils/formatIsoDate";
import { FC } from "react";

interface ChatsHistoryRowProps {
  history: History;
}

const ChatsHistoryRow: FC<ChatsHistoryRowProps> = ({ history }) => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-[#FFF] cursor-pointer">
      <div className="flex w-full flex-col gap-1 min-w-[250px]">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              {user?.id !== history?.receiver_uid
                ? history?.receiver_name
                : history?.sender_name}
            </div>
          </div>
          <div className="ml-auto text-xs text-foreground">
            {formatIsoDate(history?.latest_created_at)}
          </div>
        </div>
      </div>
      <div className="line-clamp-3 text-xs text-muted-foreground">
        {history?.latest_content}
      </div>
    </div>
  );
};

ChatsHistoryRow.displayName = "Chats History Row";
export default ChatsHistoryRow;
