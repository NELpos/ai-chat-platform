"use client";

import { AuthForm } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signIn } from "@/app/(auth)/auth";

import { useActionState, useEffect, useState } from "react";
import { login, type LoginActionState } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: "idle",
    }
  );

  const handleSignIn = async (formData: FormData) => {
    await signIn("github");
  };
  useEffect(() => {
    if (state.status === "failed") {
      toast.error("Invalid credentials!");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state.status, router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm action={handleSignIn}>
          <Button type="submit">Signin with GitHub</Button>
          {/* <Button type="submit">Signin with Okta</Button> */}
        </AuthForm>
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col gap-10 py-8 px-6">
  //     <div className="flex flex-col gap-2 *:font-medium">
  //       <h1 className="text-2xl">안녕하세요!</h1>
  //     </div>

  //     <SocialLogin />
  //   </div>
  // );
}
