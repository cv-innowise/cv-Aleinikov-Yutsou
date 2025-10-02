import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SkillItem } from "../ui/skill-item";
import { skillsByCategoriesMock } from "../mocks/skills-by-categories.mock";
import { Mastery } from "@/shared/types/cv-graphql";
import { NextIntlClientProvider } from "next-intl";
import message from "@/i18n/messages/en.json";

const meta = {
  title: "Example/SkillItem",
  component: SkillItem,
} satisfies Meta<typeof SkillItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SkillItemNotEditable: Story = {
  args: {
    name: "TypeScript",
    mastery: Mastery.Expert,
    skillsByCategories: skillsByCategoriesMock,
    isEditable: false,
    isDisabled: false,
    onChange: () => {},
  },
  render: (args) => {
    return (
      <NextIntlClientProvider messages={message} locale="en">
        <SkillItem {...args} />
      </NextIntlClientProvider>
    );
  },
};

export const EditableSkillItem: Story = {
  args: {
    name: "TypeScript",
    mastery: Mastery.Expert,
    skillsByCategories: skillsByCategoriesMock,
    isEditable: true,
    isDisabled: false,
    onChange: () => {},
  },
  render: (args) => {
    return (
      <NextIntlClientProvider messages={message} locale="en">
        <SkillItem {...args} />
      </NextIntlClientProvider>
    );
  },
};
