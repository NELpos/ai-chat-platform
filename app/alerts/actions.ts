"use server";

import db from "@/lib/db";
import { Alert } from "./columns";

export async function getAlertData(): Promise<Alert[]> {
  // Fetch data from your API here.
  const alerts = await db.event.findMany({
    where: {
      type: "alert",
    },
  });
  return alerts;
}
