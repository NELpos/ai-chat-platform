import getSession from "@/lib/session";
import { nanoid } from "@/lib/utils";
import { getMissingKeys } from "../actions";
import ChatLayout from "@/components/chat-layout";
// import { Chat } from "@/components/chat";
// import { AI } from "@/lib/chat/actions";

import { AppSidebar } from "@/components/blocks/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import ChatInterface from "./components/chat-interface";

export const metadata = {
  title: "Next.js AI Chatbot",
};

export default async function Chat() {
  // const id = nanoid();
  // const missingKeys = await getMissingKeys();
  //const chatId = await generateChatId();

  // const { messages, input, handleInputChange, handleSubmit } = useChat();

  // return <ChatLayout />;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Inventory</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Chat</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ChatInterface />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
