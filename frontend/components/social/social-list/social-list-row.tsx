import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/models/model";
import { getUserFallbackHandler } from "@/utils/getUserFallback";
import { FC } from "react";

interface SocialListRowProps {
  user: User;
}

const SocialListRow: FC<SocialListRowProps> = ({ user }) => {
  return (
    <div className="flex items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-[#FFF] cursor-pointer">
      <Avatar>
        <AvatarImage src={user?.avatar} />
        <AvatarFallback> {getUserFallbackHandler(user?.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="font-bold">{user.name}</div>
        <div className="text-xs">{user.email}</div>
      </div>
    </div>
  );
};

SocialListRow;
export default SocialListRow;
