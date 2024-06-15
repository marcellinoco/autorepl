import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Chat, User } from "@/models/model";
import { formatIsoDate } from "@/utils/formatIsoDate";
import { getUserFallbackHandler } from "@/utils/getUserFallback";
import { FC } from "react";


interface EmailResponse {
  id: string;
  subject: string;
  from: string;
  date: string;
  threadId: string;
  content: string;
  thread: EmailThread;
}

interface EmailThread {
  id: string;
  snippet: string;
  messages: EmailMessage[] | null;
}

interface EmailMessage {
  id: string;
  subject: string;
  from: string;
  date: string;
  threadId: string;
  content: string;
  thread: EmailThread;
}

interface EmailResponse {
  id: string;
  subject: string;
  from: string;
  date: string;
  threadId: string;
  content: string;
  thread: EmailThread;
}


interface ChatsDetailsRowProps {
  chat: EmailResponse;
}

const formatEmailContent = (content: string) => {
  return content.split('\r\n').map((line, index) => {
    if (line.startsWith('>>')) {
      return (
        <div key={index} style={{ paddingLeft: '20px', borderLeft: '3px solid #ccc', marginLeft: '10px' }}>
          {line}
        </div>
      );
    } else if (line.startsWith('>')) {
      return (
        <div key={index} style={{ paddingLeft: '10px', borderLeft: '2px solid #ccc', marginLeft: '5px' }}>
          {line}
        </div>
      );
    } else {
      return (
        <div key={index}>
          {line}
          <br />
        </div>
      );
    }
  });
};

const ChatsDetailsRow: FC<ChatsDetailsRowProps> = ({ chat }) => {
  return (
    <div className="w-full flex flex-col pt-4">
      <div className="max-w-[95%] px-4">
        <div className="flex flex-row justify-between items-center">
          <div className="font-bold">{chat.from}</div>
          <div className="text-xs">{new Date(chat.date).toLocaleString()}</div>
        </div>
        <div className="bg-[#DDD] px-4 py-2 rounded-lg mt-2">
          {formatEmailContent(chat.content)}
        </div>
      </div>
    </div>
  );
};

ChatsDetailsRow.displayName = 'ChatsDetailsRow';
export default ChatsDetailsRow;;
