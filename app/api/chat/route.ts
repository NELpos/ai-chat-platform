export const dynamic = "force-static";

import { bedrock } from "@ai-sdk/amazon-bedrock";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { tools } from "../../../lib/ai/tools";
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
  const { messages } = await req.json();

  // const result = streamText({
  //   model: bedrock("anthropic.claude-3-5-sonnet-20240620-v1:0"),
  //   messages,
  // });

  const lastUserMessage = messages.findLast(
    (message: any) => message.role === "user"
  )?.content;

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    system:
      "You are a friendly assistant! Show the results, but there’s no need to explain which functions were used.",
    messages,
    tools,
    maxSteps: 2, // 최대 5단계로 나누기
    async onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
      console.log("Step finished");
      console.log("Tool Results:", toolResults);

      // 추가적인 프롬프트 생성
      if (toolResults[0]?.toolName === "getBillions") {
        const status = toolResults[0]?.result?.status;
        const additionalPrompt = `Based on the tool results: ${toolResults}, ${
          status === "success" ? "통신 성공을 출력" : "통신 실패를 출력"
        }`;
        // 새로운 메시지를 추가하여 다음 단계에 전달
        messages.push({ role: "system", content: additionalPrompt });
      }
    },
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      console.log("onFinish");
      console.log(toolCalls);
      console.log(text);
      //await saveChat({ lastUserMessage, text, toolCalls, toolResults });
    },
  });

  // console.log("steps");
  // console.log(steps);
  // const result = streamText({
  //   model: bedrock("anthropic.claude-3-5-sonnet-20240620-v1:0"),
  //   maxTokens: 1000,
  //   experimental_providerMetadata: {
  //     bedrock: {
  //       guardrailConfig: {
  //         guardrailIdentifier: "tqyhctgczmdp",
  //         guardrailVersion: "1",
  //         trace: "enabled" as const,
  //         streamProcessingMode: "async",
  //       },
  //     },
  //   },
  //   system: "You are a friendly assistant!",
  //   messages,
  //   tools,
  // });

  return result.toDataStreamResponse();
}
