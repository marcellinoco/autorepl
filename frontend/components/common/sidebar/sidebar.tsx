"use client";

import { logout } from "@/app/auth/action";
import useAuthStore from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

const Sidebar: FC = () => {
  const { user, clear } = useAuthStore();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
  };

  // If the path includes "/auth", return an empty fragment
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
        {!isCollapsed && <h1 className="text-3xl font-bold">Autorepl.AI</h1>}
        <button
          className="text-xl font-bold"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "☰" : "✕"}
        </button>
      </div>
      <div className="shrink-0 bg-border h-[1px] w-full"></div>
      <div
        className={`group flex flex-col justify-center pt-4 px-[20px] ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        <div className="grid gap-1">
          <h1 className="text-base md:text-xl font-bold line-clamp-1">{user?.name}</h1>
          <h2 className="text-xs md:text-sm font-normal overflow-truncate line-clamp-1">{user?.email}</h2>
        </div>
      </div>

      <div
        className={`group flex flex-col gap-4 py-4 ${
          isCollapsed ? "items-center" : "px-[20px]"
        } flex-grow`}
      >
        <nav className="grid gap-1">
          <a
            className="cursor-pointer inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-inbox mr-2 h-4 w-4"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            </svg>
            {!isCollapsed && "Inbox"}
          </a>

          <a
            className="cursor-pointer inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start"
            href="/wiki"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lucide lucide-inbox mr-2 h-4 w-4 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
            {!isCollapsed && "Wiki"}
          </a>

          {/* Client's Mood Section */}
          <a
            className="cursor-pointer inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start"
            onClick={() => toggleMenu('mood')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            {!isCollapsed && "Client’s Mood"}
          </a>
          <ul className={`${openMenu === 'mood' ? "" : "hidden"} pl-8`}>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'Marah' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('Marah')}
            >
              Marah
            </li>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'Senang' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('Senang')}
            >
              Senang
            </li>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'Jengkel' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('Jengkel')}
            >
              Jengkel
            </li>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'Panik' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('Panik')}
            >
              Panik
            </li>
          </ul>

          {/* Urgency Section */}
          <a
            className="cursor-pointer inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start"
            onClick={() => toggleMenu('urgency')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
              />
            </svg>
            {!isCollapsed && "Urgency"}
          </a>
          <ul className={`${openMenu === 'urgency' ? "" : "hidden"} pl-8`}>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'Urgent' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('Urgent')}
            >
              Urgent
            </li>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'Not Urgent' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('Not Urgent')}
            >
              Not Urgent
            </li>
          </ul>

          {/* Inbox Status Section */}
          <a
            className="cursor-pointer inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start"
            onClick={() => toggleMenu('inbox')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {!isCollapsed && "Inbox Status"}
          </a>
          <ul className={`${openMenu === 'inbox' ? "" : "hidden"} pl-8`}>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'awaiting reply' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('awaiting reply')}
            >
              Awaiting Reply
            </li>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'in progress' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('in progress')}
            >
              In Progress
            </li>
            <li
              className={`text-xs cursor-pointer ${
                selectedStatus === 'resolved' ? 'font-bold' : ''
              }`}
              onClick={() => handleStatusClick('resolved')}
            >
              Resolved
            </li>
          </ul>
        </nav>
      </div>

      <div className="px-[20px] pb-4">
        <a
          className="cursor-pointer inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start"
          onClick={() => {
            clear();
            logout();
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          {!isCollapsed && "Logout"}
        </a>
      </div>
    </div>
  );
};

Sidebar.displayName = "Sidebar";
export default Sidebar;
