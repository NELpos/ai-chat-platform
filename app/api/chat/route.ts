export const dynamic = "force-static";

import { bedrock } from "@ai-sdk/amazon-bedrock";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { tools } from "../../../lib/ai/tools";
import { alertSchema } from "@/app/alert/add/schema";
import { saveChat } from "@/app/alerts/actions";
//import saveChat from "@/lib/ai/actions";
//import { saveChat } from "@/app/weather_chat/actions";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function GET() {
  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY,
  //     },
  //   })
  //   const data = await res.json()

  return Response.json({ ai_text: "text" });
}

// prompt: "Write a vegetarian lasagna recipe for 4 people.",

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();
  //console.log(messages.at(-1));

  const lastUserMessage = messages.findLast(
    (message: any) => message.role === "user"
  )?.content;

  // const lastMessages = messages.findLast();
  // console.log(lastMessages);

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    system:
      "You are a friendly assistant! Show the results, but there’s no need to explain which functions were used.",
    prompt: `${lastUserMessage} Create the content in the following JSON format:

    The keys to define in the JSON will be completed by referring to ${alertSchema}.
    We will complete the JSON based on the input ${lastUserMessage}.

    I'll show you a few examples related to this.

    Q. If asked to show only Jira type events, output the following JSON:
    A.
    {
      "type": "jira"
    }

    Q. If asked to show only those with type alert and status ready:
    A.
    {
      "type": "alert",
      "status": "ready"
    }

    Provide the answer in JSON like this.
        `,
    tools,
    // maxSteps: 3, // 최대 5단계로 나누기
    // async onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
    //   console.log("Step finished");
    //   console.log(text);
    // },
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      const message = await saveChat({
        chatId,
        lastUserMessage,
        text,
        toolCalls,
        toolResults,
      });
    },
  });

  return result.toDataStreamResponse();
}
