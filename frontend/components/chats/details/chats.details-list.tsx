import { Chat, User } from "@/models/model";
import { FC, useState } from "react";
import ChatsDetailsRow from "./chats-details-row";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";

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

interface ChatsDetailsListProps {
  chats: Chat[] | null;
  activeUser: User | null;
  sendMessage: (data: any) => void;
}

const exampleResponse: EmailResponse = {
  id: "1901af98331760dd",
  subject: "Re: Komplain Pesanan Sepatu",
  from: "CS Tokopedia <tokped.replai@gmail.com>",
  date: "Sat, 15 Jun 2024 15:17:56 +0700",
  threadId: "1901ae842e367cf3",
  content:
    "dcjbsakcnnak\r\n\r\n\r\ncdasjkcblkadsjnckljasd\r\n\r\ncdasbjcjklas\r\n\r\ncdasjkcjlkasnd\r\n\r\ncdaksjclakjsdnc\r\n\r\n\r\n\r\ncdksjacnjlkasnclkjasn\r\n\r\nOn Sat, Jun 15, 2024 at 3:00 PM CS Tokopedia <tokped.replai@gmail.com>\r\nwrote:\r\n\r\n> mau dikirim ini\r\n>\r\n> On Sat, Jun 15, 2024 at 2:59 PM Indra Mahaarta <indramhrt@gmail.com>\r\n> wrote:\r\n>\r\n>> saya butuh seakrang\r\n>>\r\n>> Pada Sab, 15 Jun 2024 pukul 14.59 Indra Mahaarta <indramhrt@gmail.com>\r\n>> menulis:\r\n>>\r\n>>> tolong cepet\r\n>>>\r\n>>> Pada Sab, 15 Jun 2024 pukul 14.58 Indra Mahaarta <indramhrt@gmail.com>\r\n>>> menulis:\r\n>>>\r\n>>>> Haloooo, sepatu saya mana\r\n>>>>\r\n>>>\r\n",
  thread: {
    id: "1901ae842e367cf3",
    snippet: "",
    messages: [
      {
        id: "1901ae842e367cf3",
        subject: "Komplain Pesanan Sepatu",
        from: "Indra Mahaarta <indramhrt@gmail.com>",
        date: "Sat, 15 Jun 2024 14:58:56 +0700",
        threadId: "1901ae842e367cf3",
        content: "Haloooo, sepatu saya mana\r\n",
        thread: {
          id: "",
          snippet: "",
          messages: null,
        },
      },
      {
        id: "1901ae87252ae88c",
        subject: "Re: Komplain Pesanan Sepatu",
        from: "Indra Mahaarta <indramhrt@gmail.com>",
        date: "Sat, 15 Jun 2024 14:59:07 +0700",
        threadId: "1901ae842e367cf3",
        content:
          "tolong cepet\r\n\r\nPada Sab, 15 Jun 2024 pukul 14.58 Indra Mahaarta <indramhrt@gmail.com>\r\nmenulis:\r\n\r\n> Haloooo, sepatu saya mana\r\n>\r\n",
        thread: {
          id: "",
          snippet: "",
          messages: null,
        },
      },
      {
        id: "1901ae8a251d75f4",
        subject: "Re: Komplain Pesanan Sepatu",
        from: "Indra Mahaarta <indramhrt@gmail.com>",
        date: "Sat, 15 Jun 2024 14:59:19 +0700",
        threadId: "1901ae842e367cf3",
        content:
          "saya butuh seakrang\r\n\r\nPada Sab, 15 Jun 2024 pukul 14.59 Indra Mahaarta <indramhrt@gmail.com>\r\nmenulis:\r\n\r\n> tolong cepet\r\n>\r\n> Pada Sab, 15 Jun 2024 pukul 14.58 Indra Mahaarta <indramhrt@gmail.com>\r\n> menulis:\r\n>\r\n>> Haloooo, sepatu saya mana\r\n>>\r\n",
        thread: {
          id: "",
          snippet: "",
          messages: null,
        },
      },
      {
        id: "1901ae94076d386c",
        subject: "Re: Komplain Pesanan Sepatu",
        from: "CS Tokopedia <tokped.replai@gmail.com>",
        date: "Sat, 15 Jun 2024 15:00:11 +0700",
        threadId: "1901ae842e367cf3",
        content:
          "hehe maaf saya lama\r\n\r\nOn Sat, Jun 15, 2024 at 2:59 PM Indra Mahaarta <indramhrt@gmail.com> wrote:\r\n\r\n> tolong cepet\r\n>\r\n> Pada Sab, 15 Jun 2024 pukul 14.58 Indra Mahaarta <indramhrt@gmail.com>\r\n> menulis:\r\n>\r\n>> Haloooo, sepatu saya mana\r\n>>\r\n",
        thread: {
          id: "",
          snippet: "",
          messages: null,
        },
      },
      {
        id: "1901ae95eb4e00cc",
        subject: "Re: Komplain Pesanan Sepatu",
        from: "CS Tokopedia <tokped.replai@gmail.com>",
        date: "Sat, 15 Jun 2024 15:00:19 +0700",
        threadId: "1901ae842e367cf3",
        content:
          "lagi libur\r\n\r\nOn Sat, Jun 15, 2024 at 3:00 PM CS Tokopedia <tokped.replai@gmail.com>\r\nwrote:\r\n\r\n> hehe maaf saya lama\r\n>\r\n> On Sat, Jun 15, 2024 at 2:59 PM Indra Mahaarta <indramhrt@gmail.com>\r\n> wrote:\r\n>\r\n>> tolong cepet\r\n>>\r\n>> Pada Sab, 15 Jun 2024 pukul 14.58 Indra Mahaarta <indramhrt@gmail.com>\r\n>> menulis:\r\n>>\r\n>>> Haloooo, sepatu saya mana\r\n>>>\r\n",
        thread: {
          id: "",
          snippet: "",
          messages: null,
        },
      },
      {
        id: "1901ae9a5b96a153",
        subject: "Re: Komplain Pesanan Sepatu",
        from: "CS Tokopedia <tokped.replai@gmail.com>",
        date: "Sat, 15 Jun 2024 15:00:37 +0700",
        threadId: "1901ae842e367cf3",
        content:
          "bentar bentar\r\n\r\nOn Sat, Jun 15, 2024 at 2:59 PM Indra Mahaarta <indramhrt@gmail.com> wrote:\r\n\r\n> saya butuh seakrang\r\n>\r\n> Pada Sab, 15 Jun 2024 pukul 14.59 Indra Mahaarta <indramhrt@gmail.com>\r\n> menulis:\r\n>\r\n>> tolong cepet\r\n>>\r\n>> Pada Sab, 15 Jun 2024 pukul 14.58 Indra Mahaarta <indramhrt@gmail.com>\r\n>> menulis:\r\n>>\r\n>>> Haloooo, sepatu saya mana\r\n>>>\r\n",
        thread: {
          id: "",
          snippet: "",
          messages: null,
        },
      },
      {
        id: "1901ae9ca7f63f53",
        subject: "Re: Komplain Pesanan Sepatu",
        from: "CS Tokopedia <tokped.replai@gmail.com>",
        date: "Sat, 15 Jun 2024 15:00:46 +0700",
        threadId: "1901ae842e367cf3",
        content:
          "mau dikirim ini\r\n\r\nOn Sat, Jun 15, 2024 at 2:59 PM Indra Mahaarta <indramhrt@gmail.com> wrote:\r\n\r\n> saya butuh seakrang\r\n>\r\n> Pada Sab, 15 Jun 2024 pukul 14.59 Indra Mahaarta <indramhrt@gmail.com>\r\n> menulis:\r\n>\r\n>> tolong cepet\r\n>>\r\n>> Pada Sab, 15 Jun 2024 pukul 14.58 Indra Mahaarta <indramhrt@gmail.com>\r\n>> menulis:\r\n>>\r\n>>> Haloooo, sepatu saya mana\r\n>>>\r\n",
        thread: {
          id: "",
          snippet: "",
          messages: null,
        },
      },
      {
        id: "1901af98331760dd",
        subject: "Re: Komplain Pesanan Sepatu",
        from: "CS Tokopedia <tokped.replai@gmail.com>",
        date: "Sat, 15 Jun 2024 15:17:56 +0700",
        threadId: "1901ae842e367cf3",
        content:
          "dcjbsakcnnak\r\n\r\n\r\ncdasjkcblkadsjnckljasd\r\n\r\ncdasbjcjklas\r\n\r\ncdasjkcjlkasnd\r\n\r\ncdaksjclakjsdnc\r\n\r\n\r\n\r\ncdksjacnjlkasnclkjasn\r\n\r\nOn Sat, Jun 15, 2024 at 3:00 PM CS Tokopedia <tokped.replai@gmail.com>\r\nwrote:\r\n\r\n> mau dikirim ini\r\n>\r\n> On Sat, Jun 15, 2024 at 2:59 PM Indra Mahaarta <indramhrt@gmail.com>\r\n> wrote:\r\n>\r\n>> saya butuh seakrang\r\n>>\r\n>> Pada Sab, 15 Jun 2024 pukul 14.59 Indra Mahaarta <indramhrt@gmail.com>\r\n>> menulis:\r\n>>\r\n>>> tolong cepet\r\n>>>\r\n>>> Pada Sab, 15 Jun 2024 pukul 14.58 Indra Mahaarta <indramhrt@gmail.com>\r\n>>> menulis:\r\n>>>\r\n>>>> Haloooo, sepatu saya mana\r\n>>>>\r\n>>>\r\n",
        thread: {
          id: "",
          snippet: "",
          messages: null,
        },
      },
    ],
  },
};

const ChatsDetailsList: FC<ChatsDetailsListProps> = ({
  chat,
  activeUser,
  sendMessage,
}) => {
  const [value, setValue] = useState("");
  const { user } = useAuthStore();
  const email = user?.email;
  const chats = exampleResponse;

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

  const chatDetail = () => {
    const sortedMessages = chats?.thread?.messages?.slice().sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return (
      <div
        className="h-[calc(100vh-190px)] overflow-y-scroll flex flex-col pb-4"
        style={{ scrollbarColor: "#CFD8DC #FFF", scrollbarWidth: "thin" }}
      >
        {sortedMessages?.map((message) => (
          <div key={message.id}>
            <ChatsDetailsRow chat={message} />
          </div>
        ))}
      </div>
    );
  };

  const emptyState = () => (
    <div className="h-[calc(100vh-190px)] flex flex-col items-center justify-center">
      <Image src={"/img/asset-empty.png"} width={500} height={500} alt="" />
      <div className="text-base font-bold">
        Click on Inbox to See Your Chat ^^
      </div>
    </div>
  );

  const senderEmail = chats.thread.messages?.find(
    (message) => message.from !== email
  )?.from;

  return (
    <div className="flex h-full max-h-screen flex-col w-1/2 relative">
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 flex-start items-center p-4 sticky top-0 left-0 w-full h-[52px] text-lg font-semibold bg-[#FFF] z-2">
          {senderEmail ?? "Conversation"}
        </div>
        <div className="shrink-0 bg-border h-[1px] w-full my-auto" />
        {chats.thread.messages ? chatDetail() : emptyState()}
      </div>
      <div className="p-4 bg-[#FFF] sticky bottom-0 w-full my-auto">
        <form>
          <div className="flex flex-row items-center justify-between">
            <input
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              className="flex min-h-[40px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 p-2"
              placeholder={`Reply ${senderEmail}...`}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                onSubmitHandler();
              }}
              className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-primary-foreground shadow hover:bg-primary/80 h-[40px] rounded-lg px-3 ml-2"
            >
              <p className="font-medium text-sm md:text-base mr-2">Send</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
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