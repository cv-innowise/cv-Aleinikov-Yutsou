"use client";

import { SortableColumn } from "@/shared/components/sortable-column";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../ui/actions";
import { ProjectItem } from "@/shared/graphql/projects/projects.types";

export const projectsColumns: ColumnDef<ProjectItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} text="Name" />,
  },

  {
    accessorKey: "internal_name",
    header: ({ column }) => (
      <SortableColumn column={column} text="Internal Name" />
    ),
  },

  {
    accessorKey: "domain",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} text="Domain" />,
    cell: ({ row }) => <p data-testid="domain">{row.original.domain}</p>,
  },

  {
    accessorKey: "start_date",
    enableGlobalFilter: false,
    header: ({ column }) => (
      <SortableColumn column={column} text="Start Date" />
    ),
  },

  {
    accessorKey: "end_date",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} text="End Date" />,
    cell: ({ row }) => <>{row.original.end_date ?? "Till now"}</>,
  },

  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => <Actions project={row.original} />,
  },
];
