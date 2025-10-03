"use client";

import { SortableColumn } from "@/shared/components/sortable-column";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../ui/actions";
import { ProjectItem } from "@/shared/graphql/projects/projects.types";

export const projectsColumns: ColumnDef<ProjectItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} translateKey="name" />,
  },

  {
    accessorKey: "internal_name",
    header: ({ column }) => (
      <SortableColumn column={column} translateKey="internal-name" />
    ),
  },

  {
    accessorKey: "domain",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} translateKey="domain" />,
    cell: ({ row }) => <p data-testid="domain">{row.original.domain}</p>,
  },

  {
    accessorKey: "start_date",
    enableGlobalFilter: false,
    header: ({ column }) => (
      <SortableColumn column={column} translateKey="start-date" />
    ),
  },

  {
    accessorKey: "end_date",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} translateKey="end-date" />,
    cell: ({ row }) => <>{row.original.end_date ?? "Till now"}</>,
  },

  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => <Actions project={row.original} />,
  },
];
