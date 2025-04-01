"use client";

import * as React from "react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { MoveHorizontal } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../../../components/ui/dropdown-menu";

interface DataTableColumnOrderOptionsProps<TData> {
  table: Table<TData>;
}

// Define the Column type if it's custom
type Column<T> = {
  id: string;
  getIsVisible: () => boolean;
  toggleVisibility: (value: boolean) => void;
  // Add other properties as needed
};

export function DataTableColumnOrderOptions<TData>({
  table,
}: DataTableColumnOrderOptionsProps<TData>) {
  const [columns, setColumns] = React.useState<Column<TData>[]>([]);
  const [isReordered, setIsReordered] = React.useState<boolean>(false);

  // Function to update visible columns
  const updateVisibleColumns = () => {
    const visibleColumns = table
      .getVisibleFlatColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== "undefined" &&
          column.getCanHide() &&
          column.getIsVisible()
      );
    console.log(visibleColumns);
    console.log(isReordered);

    if (isReordered) {
      // Maintain the existing order if columns have been reordered
      const reorderedColumns = columns.filter((col) =>
        visibleColumns.some((visibleCol) => visibleCol.id === col.id)
      );
      setColumns(reorderedColumns);
      setIsReordered(false);
    } else {
      // Initial load or if not reordered, use the visible columns order
      setColumns(visibleColumns);
    }
  };

  // Update columns whenever their visibility changes
  React.useEffect(() => {
    updateVisibleColumns();
  }, [table.getVisibleFlatColumns()]); // Dependency on visible columns

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        table.setColumnOrder([
          "select",
          "id",
          ...newOrder.map((column) => column.id),
        ]);
        setIsReordered(true); // Mark as reordered
        return newOrder;
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={updateVisibleColumns} // Update on hover
        >
          <MoveHorizontal />
          Column Order
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Change Order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns}
            strategy={verticalListSortingStrategy}
          >
            {columns.map((column) => (
              <SortableItem key={column.id} column={column} />
            ))}
          </SortableContext>
        </DndContext>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortableItem({ column }: { column: Column<any> }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DropdownMenuCheckboxItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="capitalize"
    >
      {column.id}
    </DropdownMenuCheckboxItem>
  );
}
