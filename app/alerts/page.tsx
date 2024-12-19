import { Alert, columns } from "./columns";
import { DataTable } from "./data-table";
import db from "@/lib/db";

export default async function Alerts() {
  // const { messages, input, handleInputChange, handleSubmit } = useChat();
  const alerts = await db.event.findMany({
    where: {
      type: "jira",
    },
  });
  console.log(alerts);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={alerts} />
    </div>
  );
}
