"use client";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { uploadAlert } from "./actions";
import { alertSchema } from "./schema";
export default function AddAlert() {
  const form = useForm<z.infer<typeof alertSchema>>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof alertSchema>) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description); // Do something with the form values.
      formData.append("type", values.type);

      const errors = await uploadAlert(formData);
      if (errors) {
        //setError()
      } else {
      }
    }
  );

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create Alert</CardTitle>
          <CardDescription>Create a new alert.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={onValid} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>티켓 이름</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="이벤트 이름"
                        type="text"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue="alert"
                      name={field.name}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="alert">Alert</SelectItem>
                        <SelectItem value="jira">Jira</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can choose the type of alert to display.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이벤트 설명</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="text"
                        required
                        placeholder="이벤트 설명"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button variant="outline" className="w-full">
                추가
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
