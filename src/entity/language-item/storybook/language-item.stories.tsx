import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LanguageItem } from "../ui/language-item";
import { languagesMock } from "../mocks/languages.mock";
import { Proficiency } from "@/shared/types/language";

const meta = {
  title: "Example/LanguageItem",
  component: LanguageItem,
} satisfies Meta<typeof LanguageItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LanguageItemNotEditable: Story = {
  args: {
    name: "Russian",
    proficiency: Proficiency.Native,
    languages: languagesMock,
    isEditable: false,
    isDisabled: false,
    onChange: () => { }
  },
};

export const EditableLanguageItem: Story = {
  args: {
    name: "Russian",
    proficiency: Proficiency.Native,
    languages: languagesMock,
    isEditable: true,
    isDisabled: false,
    onChange: (prop) => console.log(prop),
  },
}; 