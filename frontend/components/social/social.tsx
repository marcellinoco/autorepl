"use client";

import { User } from "@/models/model";
import { FC, useState } from "react";
import SocialList from "./social-list/social-list";
import SocialDetails from "./social-detail/social-detail";

interface SocialProps {
  users: User[];
}

const Social: FC<SocialProps> = ({ users }) => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const onUserClicked = (user: User) => {
    setActiveUser(user);
  };
  return (
    <>
      <SocialList users={users} onUserClicked={onUserClicked} />
      <SocialDetails user={activeUser} />
    </>
  );
};

Social.displayName = "Social";
export default Social;
