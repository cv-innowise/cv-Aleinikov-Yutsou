"use client";

import { SortableColumn } from "@/shared/components/sortable-column";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../ui/actions";
import { UserItem } from "@/shared/graphql/users/users.types";

export const usersColumns: ColumnDef<UserItem>[] = [
  {
    id: "profile.avatar",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      const avatarUrl = row.original.profile.avatar ?? undefined;

      return (
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{email[0]}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "profile.first_name",
    header: ({ column }) => (
      <SortableColumn column={column} text="First Name" />
    ),
    cell: ({ row }) => (
      <p data-testid="first-name">{row.original.profile.first_name}</p>
    ),
  },

  {
    accessorKey: "profile.last_name",
    header: ({ column }) => <SortableColumn column={column} text="Last Name" />,
  },

  {
    accessorKey: "email",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} text="Email" />,
  },

  {
    accessorKey: "department_name",
    enableGlobalFilter: false,
    header: ({ column }) => (
      <SortableColumn column={column} text="Department" />
    ),
  },

  {
    accessorKey: "position_name",
    enableGlobalFilter: false,
    header: ({ column }) => <SortableColumn column={column} text="Position" />,
  },

  {
    id: "actions",
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => (
        <Actions user={row.original} />
    ),
  },
];
