"use client";

import { SortableColumn } from "@/shared/components/sortable-column";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../ui/actions";
import { Skill } from "@/shared/graphql/skills/skills.types";

export const skillsColumns: ColumnDef<Skill>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} text="Name" />,
  },
  {
    accessorKey: "category_name",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} text="Category" />,
    cell: ({ row }) => (
      <p data-testid="category-name">{row.original.category_name}</p>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => <Actions skill={row.original} />,
  },
];
