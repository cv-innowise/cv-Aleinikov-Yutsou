"use client"

import { SortableColumn } from "@/shared/components/sortable-column";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../ui/actions";
import { Language } from "@/shared/graphql/languages/languages.types";

export const languagesColumns: ColumnDef<Language>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} translateKey="name" />,
  },
  {
    accessorKey: "native_name",
    enableGlobalFilter: false,
    header: ({ column }) => (
      <SortableColumn column={column} translateKey="native-name" />
    ),
    cell: ({ row }) => <p data-testid="native-name">{row.original.native_name}</p>,
  },
  {
    accessorKey: "iso2",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} translateKey="iso2" />,
  },
  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <Actions language={row.original} />
    ),
  },
];
