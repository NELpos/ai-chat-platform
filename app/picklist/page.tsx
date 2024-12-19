import JSONEditor from "@/components/ui/json-editor/json-editor";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
export default function Picklist() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Picklist</CardTitle>
          <CardDescription>Create a new picklist.</CardDescription>
        </CardHeader>
        <CardContent>
          <JSONEditor />
        </CardContent>
      </Card>
    </div>
  );
}
