"use server";

import getSession from "@/lib/session";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { alertSchema } from "./schema";

export async function uploadAlert(formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type"),
  };

  const result = alertSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const event = await db.event.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          type: result.data.type,
          status: "open",
          priority: "low",
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      return event;

      //revalidatePath("/home");
      //   redirect(`/alerts`);
    }
  }
}
