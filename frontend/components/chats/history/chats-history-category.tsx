"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ChatsHistoryDropdownMenuRadioGroup() {
    const [selectedStatus, setSelectedStatus] = React.useState("")

    const handleStatusClick = (status: string) => {
        setSelectedStatus(status)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Category</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {/* Client's Mood Section */}
                <DropdownMenuLabel className="px-4 py-2">Clients Mood</DropdownMenuLabel>
                <ul className="list-none m-0 p-0">
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'Marah' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('Marah')}
                    >
                        Marah
                    </li>
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'Senang' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('Senang')}
                    >
                        Senang
                    </li>
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'Jengkel' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('Jengkel')}
                    >
                        Jengkel
                    </li>
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'Panik' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('Panik')}
                    >
                        Panik
                    </li>
                </ul>

                <DropdownMenuSeparator />

                {/* Urgency Section */}
                <DropdownMenuLabel className="px-4 py-2">Urgency</DropdownMenuLabel>
                <ul className="list-none m-0 p-0">
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'Urgent' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('Urgent')}
                    >
                        Urgent
                    </li>
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'Not Urgent' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('Not Urgent')}
                    >
                        Not Urgent
                    </li>
                </ul>
                
                <DropdownMenuSeparator />

                {/* Inbox Status Section */}
                <DropdownMenuLabel className="px-4 py-2">Inbox Status</DropdownMenuLabel>
                <ul className="list-none m-0 p-0">
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'awaiting reply' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('awaiting reply')}
                    >
                        Awaiting Reply
                    </li>
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'in progress' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('in progress')}
                    >
                        In Progress
                    </li>
                    <li
                        className={`text-xs cursor-pointer px-4 py-1 ${selectedStatus === 'resolved' ? 'font-bold' : ''}`}
                        onClick={() => handleStatusClick('resolved')}
                    >
                        Resolved
                    </li>
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
