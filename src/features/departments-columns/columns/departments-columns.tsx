"use client"

import { SortableColumn } from "@/shared/components/sortable-column";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../ui/actions";
import { Department } from "@/shared/graphql/departments/departments.types";

export const departmentsColumns : ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} translateKey="name" />,
    cell: ({ row }) => <p data-testid="name">{row.original.name}</p>,
  },
  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <Actions department={row.original} />
    ),
  },
];
