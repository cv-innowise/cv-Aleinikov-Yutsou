import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Deletable,
  DeletableContent,
  DeletableItem,
  DeletableTrigger,
} from "../";
import { useState } from "react";
import { mockItems } from "../mocks/items.mock";
import { Button } from "@/shared/components/ui/button";
import { NextIntlClientProvider } from "next-intl";
import message from "@/i18n/messages/en.json";

const meta = {
  title: "Example/Deletable",
} satisfies Meta<typeof Deletable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Deleteble: Story = {
  render: () => {
    const [items, setItems] = useState(mockItems);
    const onDeleteItems = (ids: string[]) => {
      setItems(
        items.filter((item) => ids.find((id) => id === item.id) === undefined)
      );
    };
    return (
      <NextIntlClientProvider messages={message} locale="en">
        <Deletable onDeleteItems={onDeleteItems}>
          <div>
            <DeletableContent className="flex space-x-2">
              {items.map((item) => (
                <DeletableItem key={item.id} id={item.id}>
                  <Button
                    variant="outline"
                    onClick={() => console.log("asdasd")}
                  >
                    {item.name}
                  </Button>
                </DeletableItem>
              ))}
            </DeletableContent>
            <DeletableTrigger>
              <Button>Delete items</Button>
            </DeletableTrigger>
          </div>
        </Deletable>
      </NextIntlClientProvider>
    );
  },
};
