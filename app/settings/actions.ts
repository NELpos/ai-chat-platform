"use server";

import { alertsFormSchema, AlertsFormValues } from "./schema";
import getSession from "../../lib/session";
import db from "@/lib/db";
import { connect } from "http2";
import { Prisma } from "@prisma/client";

export async function fetchDefaultSettings() {
  // 여기에 데이터베이스에서 값을 가져오는 로직을 추가하세요.
  // 예를 들어, fetch API를 사용하여 서버에서 값을 가져올 수 있습니다.
  const session = await getSession();
  if (session.id) {
    // const user = await db.user.delete({
    //   where: {
    //     id: session.id,
    //   },
    // });

    const alertSetting = await db.setting.findUnique({
      where: {
        userId: session.id,
      },
      select: {
        alertPageSize: true,
      },
    });

    if (alertSetting) {
      return alertSetting;
    } else {
      return { alertPageSize: 10 };
    }
    return alertSetting;
  } else {
    return null;
  }
}

export async function updateSettings(formData: FormData) {
  const data = {
    alertPageSize: parseInt(formData.get("alertPageSize") as string),
  };

  const result = alertsFormSchema.safeParse(data);

  console.log(result);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const settings = await db.setting.upsert({
        where: {
          userId: session.id,
        },
        update: {
          alertPageSize: result.data.alertPageSize,
        },
        create: {
          alertPageSize: result.data.alertPageSize,
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
      return null;
    }
  }
  return null;
}
