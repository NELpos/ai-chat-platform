"use client";
import * as React from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "../button";
import { Input } from "../input";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
  CircleAlert,
  Bell,
} from "lucide-react";

import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  /*
  open
  ready
  investigating
  analysis
  pending
  notify
  closed
  review
  l3_escalation
  re_opened
*/

  const statuses = [
    {
      value: "open",
      label: "Open",
      icon: HelpCircle,
    },
    {
      value: "ready",
      label: "Ready",
      icon: Circle,
    },
    {
      value: "investigating",
      label: "Investigating",
      icon: Timer,
    },
    {
      value: "analysis",
      label: "Analysis",
      icon: CheckCircle,
    },
    {
      value: "pending",
      label: "Pending",
      icon: CircleOff,
    },
    {
      value: "notify",
      label: "Notify",
      icon: Bell,
    },
    {
      value: "closed",
      label: "Closed",
      icon: CheckCircle,
    },
  ];

  const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDown,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRight,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUp,
    },
    {
      label: "Critical",
      value: "critical",
      icon: CircleAlert,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}