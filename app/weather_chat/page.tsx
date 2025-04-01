"use client";

import { useChat } from "ai/react";
import { WeatherWidget } from "@/components/widget/weather-widget";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BillionsWidget } from "@/components/widget/billions-widget";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch ">
      {messages.map(
        (message) => (
          console.log(message),
          (
            <div
              key={message.id}
              className={`flex items-start ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {message.role === "assistant" ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6819/6819644.png"
                  alt="AI Profile"
                  className="mr-3 w-12 h-12 rounded-full"
                />
              ) : null}

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
              {/* <div>
            {message.toolInvocations?.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === "result") {
                if (toolName === "displayWeather") {
                  console.log(toolInvocation);
                  const { result } = toolInvocation;
                  return (
                    <div key={toolCallId}>
                      <WeatherWidget {...result} />
                    </div>
                  );
                } else if (toolName === "getBillions") {
                  const { result } = toolInvocation;
                  return (
                    <div key={toolCallId}>
                      <BillionsWidget {...result} />
                    </div>
                  );
                }
              } else {
                return (
                  <div key={toolCallId}>
                    {toolName === "displayWeather" ? (
                      <div className="relative max-w-fit p-3 rounded-lg shadow bg-gray-200 text-black ml-auto">
                        Loading weather...
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div> */}
            </div>
          )
        )
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-2xl mb-8 border border-gray-300 rounded shadow-xl"
      >
        <div className="flex items-center bg-white shadow-md rounded-lg p-4">
          <Input
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button
            className="ml-2 p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-r-lg transition-colors duration-300"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
