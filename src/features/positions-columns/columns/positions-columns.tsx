"use client";

import { SortableColumn } from "@/shared/components/sortable-column";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../ui/actions";
import { Position } from "@/shared/graphql/positions/positions.types";

export const positionsColumns: ColumnDef<Position>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} text="Name" />,
    cell: ({ row }) => <p data-testid="name">{row.original.name}</p>,
  },
  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => <Actions position={row.original} />,
  },
];
