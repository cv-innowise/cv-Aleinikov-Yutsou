import { ColumnDef } from "@tanstack/react-table";
import { PaymentMock } from "./data.mock";

export const columnsMock: ColumnDef<PaymentMock>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          data-testid="sort-email"
        >
          Email
        </button>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "position",
    header: "Position",
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return "actions";
    },
    enableGlobalFilter: false,
  },
];
