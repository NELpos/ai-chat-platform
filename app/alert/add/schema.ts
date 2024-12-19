// Define Schema
import { z } from "zod";

export const alertSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  type: z.enum(["alert", "jira"], {
    required_error: "Please select an type to display.",
  }),
});
