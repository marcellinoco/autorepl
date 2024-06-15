import Chats from "@/components/chats/chats";
import { getHistory } from "./action";

export default async function Home() {
  const { emails } = await getHistory();
  return <Chats histories={emails} />;
}
