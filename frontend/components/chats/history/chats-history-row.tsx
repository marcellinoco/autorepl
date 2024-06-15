import { History, Priority, Mood } from "@/models/model";
import useAuthStore from "@/store/useAuthStore";
import { formatIsoDate } from "@/utils/formatIsoDate";
import { FC } from "react";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdOutlineCircle,
  MdDragHandle,
} from "react-icons/md";

// Import emojis for moods
import { FaAngry, FaSmile, FaMeh, FaSadTear } from "react-icons/fa";

// Mappings for priority and mood
const priorityIcons = {
  [Priority.HIGH]: <MdKeyboardDoubleArrowUp className="text-red-500" />,
  [Priority.MEDIUM]: <MdDragHandle className="text-yellow-500" />,
  [Priority.LOW]: <MdKeyboardDoubleArrowDown className="text-green-500" />,
  [Priority.NONE]: <MdOutlineCircle className="text-gray-500" />,
};

const moodIcons = {
  [Mood.ANGRY]: <FaAngry className="text-red-500" />,
  [Mood.HAPPY]: <FaSmile className="text-green-500" />,
  [Mood.NEUTRAL]: <FaMeh className="text-yellow-500" />,
  [Mood.SAD]: <FaSadTear className="text-blue-500" />,
};

interface ChatsHistoryRowProps {
  history: History;
}

const ChatsHistoryRow: FC<ChatsHistoryRowProps> = ({ history }) => {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-[#FFF] cursor-pointer">
      <div className="flex w-full flex-col gap-1 min-w-[250px]">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {/* Severity indicator */}
            {!!history.priority && <div>{priorityIcons[history.priority]}</div>}
            <div className="font-semibold">{history?.from}</div>
          </div>
          <div className="ml-auto text-xs text-foreground">
            {formatIsoDate(history?.date)}
          </div>
        </div>
        {/* Products badges */}
        <div className="flex flex-wrap gap-1">
          {history.products &&
            history.products.slice(0,3).map((product) => (
              <span
                key={product}
                className="bg-gray-500 text-white text-[0.6rem] rounded-full px-0.5 py-0.3"
              >
                {product}
              </span>
            ))}
        </div>
      </div>
      <div className="line-clamp-3 text-xs text-muted-foreground">
        {history?.summary}
      </div>
      {/* Mood emoji */}
      {!!history.mood && (
        <div className="ml-auto">{moodIcons[history.mood]}</div>
      )}
    </div>
  );
};

ChatsHistoryRow.displayName = "Chats History Row";
export default ChatsHistoryRow;
