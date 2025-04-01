"use server";

import { z } from "zod";

import { getUser } from "@/lib/db/queries";

import { signIn } from "./auth";

export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export const login = async (_: LoginActionState): Promise<LoginActionState> => {
  try {
    await signIn("github");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
