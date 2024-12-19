import getSession from "@/lib/session";
import { nanoid } from "@/lib/utils";
import { getMissingKeys } from "../actions";
import { generateChatId } from "@/lib/ai/actions";
import ChatLayout from "@/components/chat-layout";
// import { Chat } from "@/components/chat";
// import { AI } from "@/lib/chat/actions";

export const metadata = {
  title: "Next.js AI Chatbot",
};

export default async function Chat() {
  const id = nanoid();
  const missingKeys = await getMissingKeys();
  //const chatId = await generateChatId();

  // const { messages, input, handleInputChange, handleSubmit } = useChat();

  return <ChatLayout />;
}
