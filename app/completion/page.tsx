"use client";

import { useCompletion } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Page() {
  const { isLoading, completion, input, handleInputChange, handleSubmit } =
    useCompletion({
      api: "/api/completion",
      //   experimental_throttle: 50,
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          id="input"
        />
        <button type="submit">Submit</button>
      </form>
      <div>{completion}</div>
    </div>
  );
}
