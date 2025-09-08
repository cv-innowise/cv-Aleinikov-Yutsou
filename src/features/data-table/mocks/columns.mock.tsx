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
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return "actions";
    }
  }
];
