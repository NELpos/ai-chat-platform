"use client";

import { useState, useEffect } from "react";
import { isValidJSON, formatJSON, parseJSON } from "../../../lib/json-utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { JSONTreeView } from "./json-treeview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const FormSchema = z.object({
  picklist_value: z.string().refine(
    (value) => {
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Picklist value must be a valid JSON string.",
    }
  ),
});

//import { AddKeyValuePair } from "./AddKeyValuePair";

export default function JSONEditor() {
  const [json, setJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const { isValid } = form.formState;

  useEffect(() => {
    if (isValidJSON(json)) {
      setParsedData(parseJSON(json));
    } else {
      setParsedData(null);
    }
  }, [json]);

  const handleFormat = () => {
    //Get Form Value
    const currentValue = form.getValues("picklist_value");
    if (isValidJSON(currentValue)) {
      const formattedJson = formatJSON(currentValue);
      setJson(formattedJson);
      form.setValue("picklist_value", formattedJson);
      setEnableSubmit(true);
      setError(null);
    } else {
      toast({
        title: "Invalid JSON Data",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {" "}
              Invalid Json format :{JSON.stringify(currentValue, null, 2)}
            </code>
          </pre>
        ),
      });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (isValidJSON(content)) {
          setJson(formatJSON(content));
          setError(null);
        } else {
          setError("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    if (isValidJSON(json)) {
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported.json";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      setError("Cannot export invalid JSON");
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="tree">Tree View</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="picklist_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Picklist Value</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter your JSON here..."
                        className="font-mono w-[700px] min-h-[300px]"
                      />
                    </FormControl>
                    <FormDescription>You can</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={handleFormat} className="mr-1">
                Format JSON
              </Button>
              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="tree">
          {parsedData ? (
            <JSONTreeView data={parsedData} />
          ) : (
            <p className="text-red-500">Invalid JSON or empty</p>
          )}
        </TabsContent>
      </Tabs>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between space-x-2"></div>
        {/* <AddKeyValuePair onAdd={handleAddKeyValue} /> */}
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
