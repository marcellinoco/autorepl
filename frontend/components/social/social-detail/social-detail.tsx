import { User } from "@/models/model";
import Image from "next/image";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { formatIsoDate } from "@/utils/formatIsoDate";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { getUserFallbackHandler } from "@/utils/getUserFallback";

interface SocialDetailsProps {
  user: User | null;
}

const SocialDetails: FC<SocialDetailsProps> = ({ user }) => {
  const router = useRouter();

  const userDetail = () => (
    <div
      className="h-[calc(100vh-52px)] overflow-y-scroll flex gap-2 flex-col items-center justify-center"
      style={{ scrollbarColor: "#CFD8DC #FFF", scrollbarWidth: "thin" }}
    >
      <Avatar className="w-[250px] h-[250px] aspect-square mb-4">
        <AvatarImage src={user?.avatar} />
        <AvatarFallback> {getUserFallbackHandler(user?.name)}</AvatarFallback>
      </Avatar>
      <div className="font-bold text-lg">{user?.name}</div>
      <div className="font-semibold text-base">{user?.email}</div>
      <div className="text-sm">{`Joined from ${formatIsoDate(
        user?.created_at ?? ""
      )}`}</div>
      <Button
        className="flex gap-2 mt-2"
        onClick={() => router.push(`/?uid=${user?.uid}&name=${user?.name}`)}
      >
        Send Message <PaperPlaneIcon className="-rotate-45" />
      </Button>
    </div>
  );

  const emptyState = () => (
    <div className="h-[calc(100vh-52px)] flex flex-col items-center justify-center">
      <Image src={"/img/asset-empty.png"} width={500} height={500} alt="" />
      <div className="text-base font-bold">Select User to see the Detail</div>
    </div>
  );

  return (
    <div className="flex h-full max-h-screen flex-col w-1/2 relative">
      <div className="flex flex-1 flex-col">
        <div className="flex gap-2 flex-start items-center p-4 sticky top-0 left-0 w-full h-[52px] text-lg font-semibold bg-[#FFF] z-2">
          User Detail
        </div>
        <div className="shrink-0 bg-border h-[1px] w-full mt-auto" />
        {user ? userDetail() : emptyState()}
      </div>
    </div>
  );
};

SocialDetails.displayName = "Social Details";
export default SocialDetails;
