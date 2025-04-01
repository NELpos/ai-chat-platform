import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Alert {
  id: number;
  type: string;
  title: string;
  description: string;
  userId: number;
  chatId: number | null;
  status: string;
  priority: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const where: any = {};
  if (type) where.type = type;
  if (status) where.status = status;
  if (priority) where.priority = priority;

  const alerts = await db.event.findMany({
    where,
  });
  return NextResponse.json(alerts);
}
