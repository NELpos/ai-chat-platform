"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateSettings } from "./actions";
import { useState } from "react";

const alertsFormSchema = z.object({
  alertPageSize: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Expected a number",
    }),
});

type AlertsFormValues = z.infer<typeof alertsFormSchema>;

export function AlertsForm({
  defaultValues,
}: {
  defaultValues: AlertsFormValues;
}) {
  const form = useForm<AlertsFormValues>({
    resolver: zodResolver(alertsFormSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const [submitDisabled, setSubmitDisabled] = useState(false);

  async function onSubmit(data: AlertsFormValues) {
    setSubmitDisabled(true);
    const formData = new FormData();
    formData.append("alertPageSize", data.alertPageSize + "");

    const errors = await updateSettings(formData);
    if (errors) {
      console.log(errors);
      //setError()
    } else {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      setSubmitDisabled(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="alertPageSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Size</FormLabel>
              <FormControl>
                <Input
                  placeholder={defaultValues.alertPageSize + ""}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Set the number of alerts to display per page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="alertPageSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alerts Page Size</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value + ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can select Alert Page Size
                {/* <Link href="/examples/forms">email settings</Link>. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitDisabled}>
          Apply
        </Button>
      </form>
    </Form>
  );
}
