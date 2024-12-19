import { nanoid } from "nanoid";
import db from "../db";
import getSession from "../session";

export async function generateChatId() {
  const session = await getSession();
  console.log(session.id);
  if (session.id) {
    const chat = await db.chat.create({
      data: {
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return chat.id;
  }
  return null;
}

export function saveChat({
  lastUserMessage,
  text,
  toolCalls,
  toolResults,
}: {
  lastUserMessage: string;
  text: string;
  toolCalls: any;
  toolResults: any;
}) {
  console.log(lastUserMessage);
  console.log(text);
  console.log(toolCalls);
  console.log(toolResults);
}
