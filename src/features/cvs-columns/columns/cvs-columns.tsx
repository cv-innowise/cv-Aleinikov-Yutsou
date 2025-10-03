"use client"

import { SortableColumn } from "@/shared/components/sortable-column";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../ui/actions";
import { CvItem } from "@/shared/graphql/cvs/cvs.types";

export const cvsColumns: ColumnDef<CvItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} translateKey="name" />,
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <SortableColumn column={column} translateKey="description" />
    ),
    cell: ({ row }) => (
      <p
        className="max-w-[60vw] whitespace-pre-wrap break-all text-muted-foreground line-clamp-3"
        data-testid="cv-description"
      >
        {row.original.description}
      </p>
    ),
  },

  {
    accessorKey: "user.email",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} translateKey="employee" />,
  },

  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => <Actions cv={row.original} />,
  },
];
