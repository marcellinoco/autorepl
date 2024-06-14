import Social from "@/components/social/social";
import { getSocial } from "./action";

export default async function SocialPage() {
  const { users } = await getSocial();
  return <Social users={users} />;
}
