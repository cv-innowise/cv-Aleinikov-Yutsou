import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DataTable } from "../ui/data-table";
import { PaymentMock, dataMock } from "../mocks/data.mock";
import { columnsMock } from "../mocks/columns.mock";

const meta = {
  title: "Example/DataTable",
  component: DataTable<PaymentMock, PaymentMock>,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        searchParams: {

        },
      },
    },
  }
} satisfies Meta<typeof DataTable<PaymentMock, PaymentMock>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaymentsTable: Story = {
  args: {
    data: dataMock,
    columns: columnsMock,
    searchColumn: "email",
  },
};