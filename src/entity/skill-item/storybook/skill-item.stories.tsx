import type { Meta, StoryObj } from "@storybook/nextjs-vite";


import { SkillItem } from "../ui/skill-item";
import { categoriesMock } from "../mocks/categories.mock";
import { Mastery } from "@/shared/lib/types/skill";

const meta = {
  title: "Example/SkillItem",
  component: SkillItem,
} satisfies Meta<typeof SkillItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SkillItemNotEditable: Story = {
  args: {
    skill: "TypeScript",
    mastery: Mastery.EXPERT,
    categories: categoriesMock,
    isEditable: false,
    isDisabled: false,
    onChange: () => { }
  },
};

export const EditableSkillItem: Story = {
  args: {
    skill: "TypeScript",
    mastery: Mastery.EXPERT,
    categories: categoriesMock,
    isEditable: true,
    isDisabled: false,
    onChange: () => {},
  },
}; 