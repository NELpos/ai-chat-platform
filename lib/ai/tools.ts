// Add a new stock tool
import { tool as createTool } from "ai";
import { z } from "zod";

// export const weatherTool = createTool({
//   description: "Display the weather for a location",
//   parameters: z.object({
//     location: z.string().describe("The location to get the weather for"),
//   }),
//   execute: async function ({ location }) {
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     return { weather: "Sunny", temperature: 75, location };
//   },
// });
export type QueryConditions = {
  type?: string;
  status?: string;
  priority?: string;
  title?: { contains: string };
  description?: { contains: string };
};

export const getAlertsTool = createTool({
  description:
    "Finds Alerts based on the parameter information provided by the user's specified conditions",
  parameters: z.object({
    type: z
      .string()
      .transform((val) => val.toLowerCase())
      .describe("The type of the alert")
      .optional(),
    status: z
      .string()
      .transform((val) => val.toLowerCase())
      .describe("The status of the alert")
      .optional(),
    priority: z
      .string()
      .transform((val) => val.toLowerCase())
      .describe("The priority of the alert")
      .optional(),
    title: z.string().describe("The title of the alert").optional(),
    description: z.string().describe("The description of the alert").optional(),
  }),
  execute: async function ({ type, status, priority, title, description }) {
    // 소문자 변환이 필요 없음
    try {
      const queryConditions: QueryConditions = {};
      if (type) {
        queryConditions.type = type;
      }
      if (status) {
        queryConditions.status = status;
      }
      if (priority) {
        queryConditions.priority = priority;
      }

      if (title && title !== undefined) {
        queryConditions.title = { contains: title };
      }
      if (description && description !== undefined) {
        queryConditions.description = { contains: description };
      }
      return { queryConditions };
    } catch (error) {
      return { error: "Failed to fetch alerts" };
    }
  },
});

// Update the tools object
export const tools = {
  // displayWeather: weatherTool,
  // getBillions: billionsTool,
  getAlerts: getAlertsTool,
};
