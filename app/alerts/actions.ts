"use server";

import { QueryConditions } from "@/lib/ai/tools";
import db from "@/lib/db";
import getSession from "@/lib/session";
// import { Pagination } from "./data-table-pagination";

const pageList = ["alerts"];

interface fetchAlertsProps {
  pageSize: number;
  pageIndex: number;
  queryConditions: any;
}

interface fetchChatsProps {
  pageName: string;
}

interface saveChatProps {
  lastUserMessage: string;
  text: string;
  toolCalls: any;
  toolResults: any;
  chatId: string;
}

export async function getTotalRowCount(queryConditions: any) {
  const totalRowCount = await db.event.count({
    where: queryConditions,
  });
  return totalRowCount;
}

export async function updatePageSize(pageSize: number) {
  const session = await getSession();
  if (session.id) {
    await db.setting.update({
      where: { userId: session.id },
      data: { alertPageSize: pageSize },
    });
  }
}

export async function getPageSize() {
  const session = await getSession();
  if (session.id) {
    const alertPageSize = await db.setting.findFirst({
      where: {
        userId: session.id,
      },
      select: {
        alertPageSize: true,
      },
    });
    if (alertPageSize) {
      return alertPageSize.alertPageSize;
    }
    return 10;
  }
  return 10;
}

export async function fetchAlerts({
  pageSize,
  pageIndex,
  queryConditions,
}: fetchAlertsProps) {
  const alerts = await db.event.findMany({
    where: queryConditions,
    skip: pageIndex * pageSize,
    take: pageSize,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return alerts;
}

export async function fetchChats({ pageName }: fetchChatsProps) {
  const session = await getSession();
  if (!session.id) {
    return [];
  }
  const chats = await db.chat.findMany({
    where: {
      pageName: pageName,
      userId: session.id,
    },
    select: {
      id: true,
      title: true,
    },
  });
  if (chats) {
    return chats;
  }
  return [];
}

export async function initializeChatId(pageName: string) {
  const session = await getSession();

  if (!pageName) {
    return null;
  }

  if (session.id) {
    //check if chat exists
    const chat = await db.chat.findFirst({
      where: {
        pageName: pageName,
        userId: session.id,
      },
    });

    if (chat) {
      return chat.id;
    } else {
      if (pageList.includes(pageName)) {
        const chat = await db.chat.create({
          data: {
            pageName: pageName,
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
    }
  }
  return null;
}

export async function generateChatId(pageName: string) {
  const session = await getSession();

  if (!pageName) {
    return null;
  }

  if (session.id) {
    if (pageList.includes(pageName)) {
      const chat = await db.chat.create({
        data: {
          pageName: pageName,
          user: {
            connect: {
              id: session.id,
            },
          },
          title: "New Chat",
        },
        select: {
          id: true,
          title: true,
        },
      });
      return chat;
    }
  }
  return null;
}

export async function saveChat({
  lastUserMessage,
  text,
  toolCalls,
  toolResults,
  chatId,
}: saveChatProps) {
  //Get userId from chatId
  const userId = await db.chat.findFirst({
    where: {
      id: chatId,
    },
    select: {
      userId: true,
    },
  });

  if (userId) {
    const message = await db.message.create({
      data: {
        userId: userId.userId,
        chatId: chatId,
        userMessage: lastUserMessage,
        aiMessage: text,
        toolCall: toolCalls,
        toolResults: toolResults,
      },
    });
    return message;
  }
  return null;
}

export async function fetchMessages(chatId: string) {
  const messages = await db.message.findMany({
    where: {
      chatId: chatId,
    },
  });
  return messages;
}
