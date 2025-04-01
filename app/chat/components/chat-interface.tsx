"use client";

import React, { useState, useCallback } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";

// 채팅 데이터 타입 정의
type ChatItem = {
  id: string;
  title: string;
  messages: { sender: string; content: string }[];
};

// 샘플 채팅 데이터
const sampleChats: ChatItem[] = [
  {
    id: "1",
    title: "첫 번째 대화",
    messages: [
      { sender: "User", content: "안녕하세요!" },
      { sender: "AI", content: "안녕하세요! 무엇을 도와드릴까요?" },
    ],
  },
  {
    id: "2",
    title: "두 번째 대화",
    messages: [
      { sender: "User", content: "오늘 날씨 어때요?" },
      { sender: "AI", content: "오늘은 맑고 화창한 날씨입니다." },
    ],
  },
  // 더 많은 샘플 채팅을 추가할 수 있습니다.
];

export default function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [inputMessage, setInputMessage] = useState("");

  const handleChatSelect = useCallback((chat: ChatItem) => {
    setSelectedChat(chat);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() && selectedChat) {
      setSelectedChat((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [
            ...prev.messages,
            { sender: "User", content: inputMessage.trim() },
          ],
        };
      });
      setInputMessage("");
    }
  }, [inputMessage, selectedChat]);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-64 border-r bg-gray-50 flex-shrink-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
            {sampleChats.map((chat) => (
              <Button
                key={chat.id}
                variant={selectedChat?.id === chat.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleChatSelect(chat)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {chat.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4 overflow-auto">
          {selectedChat ? (
            selectedChat.messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "User" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "User"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              채팅을 선택해주세요.
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t flex">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 mr-2"
          />
          <Button onClick={handleSendMessage}>보내기</Button>
        </div>
      </div>
    </div>
  );
}
