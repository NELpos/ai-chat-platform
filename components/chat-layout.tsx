"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatWindow from "./chat-window";
import { ContextMenu } from "./context-menu";

const messages = [
  { id: 1, sender: "홍길동", content: "안녕하세요!", timestamp: "10:00 AM" },
  {
    id: 2,
    sender: "나",
    content: "네, 안녕하세요. 무엇을 도와드릴까요?",
    timestamp: "10:05 AM",
  },
  {
    id: 3,
    sender: "홍길동",
    content: "프로젝트 관련 문의가 있습니다.",
    timestamp: "10:10 AM",
  },
];

const generateDummyChat = () => {
  const id = Date.now();
  return {
    id,
    name: `새 채팅 `,
    lastMessage: "새로운 대화를 시작하세요!",
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  chatId: number | null;
}

export default function ChatLayout() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "홍길동",
      lastMessage: "안녕하세요!",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      name: "김철수",
      lastMessage: "오늘 회의 시간이 어떻게 되나요?",
      timestamp: "11:30 AM",
    },
    {
      id: 3,
      name: "이영희",
      lastMessage: "프로젝트 진행 상황 공유해 주세요.",
      timestamp: "2:15 PM",
    },
  ]);
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    chatId: null,
  });

  const closeContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
  }, []);

  const closeChat = useCallback(
    (chatId: number) => {
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      if (selectedChat?.id === chatId) {
        setSelectedChat(chats.find((chat) => chat.id !== chatId) || null);
      }
      closeContextMenu(); // Now this is defined before use
    },
    [chats, selectedChat, closeContextMenu]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, chatId: number) => {
      e.preventDefault();
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        chatId,
      });
    },
    []
  );

  const addNewChat = () => {
    const newChat = generateDummyChat();
    setChats([...chats, newChat]);
    setSelectedChat(newChat);
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs
        defaultValue={selectedChat?.id.toString()}
        value={selectedChat?.id.toString()}
        onValueChange={(value) => {
          const chat = chats.find((c) => c.id.toString() === value);
          if (chat) setSelectedChat(chat);
        }}
      >
        <TabsList
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${chats.length + 1}, minmax(0, 1fr))`,
            alignItems: "stretch",
          }}
        >
          {chats.map((chat) => (
            <TabsTrigger
              key={chat.id}
              value={chat.id.toString()}
              className="relative flex items-center justify-center h-10 px-3 py-2"
              onContextMenu={(e) => handleContextMenu(e, chat.id)}
            >
              {chat.name}
            </TabsTrigger>
          ))}
          <button
            onClick={addNewChat}
            className="h-10 px-3 py-2 rounded-md bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-center"
            aria-label="New Chat"
          >
            + New Chat
          </button>
        </TabsList>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <TabsContent key={chat.id} value={chat.id.toString()}>
              <ChatWindow chat={chat} messages={messages} />
            </TabsContent>
          ))
        ) : (
          <div className="text-center p-4">
            <p>모든 채팅이 닫혔습니다.</p>
          </div>
        )}
      </Tabs>
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          onCloseChat={() =>
            contextMenu.chatId && closeChat(contextMenu.chatId)
          }
        />
      )}
    </div>
  );
}
