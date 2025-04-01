"use client";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useChat } from "ai/react";
import { AlertType } from "@/app/alert/add/schema";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Send, MessageCircle, MessageCirclePlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { fetchChats, generateChatId, fetchMessages } from "./actions";
import getSession from "@/lib/session";
import { QueryConditions } from '@/lib/ai/tools';

// 채팅 데이터 타입 정의
type ChatItem = {
  id: string;
  title: string | null;
  // messages: { sender: string; content: string }[];
};

const suggestedActions = [
  {
    title: "Ready 이벤트 필터하기",
    label: "Ticket 상태값으로 필터하기",
    action: "상태가 Ready인 이벤트만 보여줘",
  },
  {
    title: "HL01로 시작하는 이벤트보기",
    label: "이벤트 title로 필터하기",
    action: "'HL01'로 시작하는 이벤트만 보여줘",
  },
  {
    title: "복잡한 이벤트 필터하기",
    label: "다양한 조건의 이벤트 조회하기",
    action: "이벤트 type인 jira이고 상태가 Ready인 이벤트 보여주기",
  },
  {
    title: "오래된 이벤트 필터하기",
    label: "오래된 이벤트만 보여줘",
    action: "오래된 이벤트만 보여줘",
  },
];

export function TableAIChat({
  onClose,
  handleQueryConditionsChange,
}: {
  onClose: () => void;
  handleQueryConditionsChange: (newQueryConditions: any) => void;
}) {
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);

  const {
    messages,
    input,
    setMessages,
    setInput,
    handleInputChange,
    handleSubmit,
  } = useChat({
    body: {
      chatId: selectedChat?.id,
    },
  });

  const handleChatSelect = useCallback((chat: ChatItem) => {
    setSelectedChat(chat);
  }, []);

  const [chats, setChats] = useState<ChatItem[]>([]);

  const [queryConditionsResults, setQueryConditionsResults] = useState();

  const handleNewChat = useCallback(async () => {
    setMessages([]);
    setInput("");
    const chat = await generateChatId("alerts");
    if (chat) {
      setSelectedChat(chat);
    }
  }, []);

  // 초기 채팅 데이터 가져오기
  const initialFetchData = useCallback(async () => {
    const chats = await fetchChats({ pageName: "alerts" });
    if (chats) {
      setChats(chats);
      setSelectedChat(chats[0]);
      // const messages = await fetchMessages(chats[0].id);
      // setMessages(messages);
    }
  }, []);

  useEffect(() => {
    initialFetchData();
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  // 신규 채팅 생성시 데이터 업데이트
  const fetchData = useCallback(async () => {
    const chats = await fetchChats({ pageName: "alerts" });
    if (chats) {
      setChats(chats);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedChat]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Card className="w-[1080px] h-[680px] fixed bottom-20 right-4 flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between items-center bg-neutral-800 text-white p-3 rounded-t-lg">
            {selectedChat?.title}
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNewChat}
                className="text-white"
              >
                <MessageCirclePlus />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white"
              >
                <X />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full flex">
          <div className="w-64 border-r bg-gray-50 flex-shrink-0 mr-4">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {chats.map((chat) => (
                  <Button
                    key={chat.id}
                    variant={selectedChat?.id === chat.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleChatSelect(chat)}
                  >
                    {chat.title || "New Chat"}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="h-full w-full pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  {message.content && (
                    <div
                      className={`relative max-w-fit p-3 rounded-lg shadow ${
                        message.role === "user"
                          ? "bg-neutral-800 text-white ml-auto"
                          : "bg-gray-200 text-black mr-auto"
                      }`}
                    >
                      {message.content}
                      <div
                        className={`absolute w-0 h-0 border-t-8 border-t-transparent ${
                          message.role === "user"
                            ? "border-l-8 border-l-neutral-800 right-0 -mr-2"
                            : "border-r-8 border-r-gray-200 left-0 -ml-2"
                        }`}
                        style={{ top: "50%" }}
                      ></div>
                    </div>
                  )}
                  {message.role === "user" ? (
                    <img
                      src="https://ui.shadcn.com/avatars/02.png"
                      alt="User Profile"
                      className="ml-3 w-12 h-12 rounded-full"
                    />
                  ) : null}
                  <div>
                    {message.toolInvocations?.map((toolInvocation) => {
                      const { toolName, toolCallId, state } = toolInvocation;
                      if (state === "result") {
                        if (toolName === "getAlerts") {
                          const { result } = toolInvocation;
                          const { queryConditions } = result;
                          handleQueryConditionsChange(queryConditions);
                          //onClose();
                          return (
                            <div
                              key={toolCallId}
                              className="relative max-w-fit p-3 rounded-lg shadow bg-gray-200 text-black mr-auto"
                            >
                              네 결과를 반영했습니다.
                            </div>
                          );
                        }
                        // } else if (toolName === "getBillions") {
                        //   const { result } = toolInvocation;
                        //   return (
                        //     <div key={toolCallId}>
                        //       <BillionsWidget {...result} />
                        //     </div>
                        //   );
                        // }
                      } else {
                        return (
                          <div key={toolCallId}>
                            <div className="relative max-w-fit p-3 rounded-lg shadow bg-gray-200 text-black ml-auto">
                              Loading...
                            </div>
                          </div>
                          // <div key={toolCallId}>
                          //   {toolName === "displayWeather" ? (
                          //     <div className="relative max-w-fit p-3 rounded-lg shadow bg-gray-200 text-black ml-auto">
                          //       Loading...
                          //     </div>
                          //   ) : null}
                          // </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex flex-col gap-2 w-full items-center">
              <div className="grid sm:grid-cols-2 gap-2 w-full px-4 md:px-0 mx-auto md:max-w-[500px] mb-4">
                {messages.length === 0 &&
                  suggestedActions.map((action, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.01 * index }}
                      key={index}
                      className={index > 1 ? "hidden sm:block" : "block"}
                    >
                      <button
                        onClick={async () => {
                          setInput(action.action);
                        }}
                        className="w-full text-left border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-lg p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col"
                      >
                        <span className="font-medium">{action.title}</span>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {action.label}
                        </span>
                      </button>
                    </motion.div>
                  ))}
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full mb-8 border border-gray-300 rounded shadow-xl"
              >
                <div className="flex items-center bg-white shadow-md rounded-lg p-4">
                  <Input
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                  />
                  <Button
                    className="ml-2 p-2 text-white bg-neutral-900 hover:bg-neutral-800 rounded-r-lg transition-colors duration-300"
                    type="submit"
                  >
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
}
