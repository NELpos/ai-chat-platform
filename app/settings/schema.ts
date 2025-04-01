import { z } from "zod";

export const alertsFormSchema = z.object({
  alertPageSize: z.number().min(1).max(100),
});

export type AlertsFormValues = z.infer<typeof alertsFormSchema>;
