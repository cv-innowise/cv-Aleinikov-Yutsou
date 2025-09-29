import { cleanup, render, screen, within } from "@testing-library/react";
import { describe, expect, it, afterEach, Mock } from "vitest";
import { LanguageSwitcher } from "../ui/language-switcher";
import { vi } from "vitest";

import { userEvent } from "@vitest/browser/context";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

const refresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("../model/action", () => ({
  setLocale: vi.fn().mockResolvedValue(undefined),
}));

import { setLocale } from "../model/action";

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("LanguageSwitcher", () => {
  it("renders language switcher correctly", async () => {
    render(<LanguageSwitcher />);

    expect(await screen.findByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
  });
  it("display all language options", async () => {
    render(<LanguageSwitcher />);
    const trigger = await screen.findByRole("combobox");
    await userEvent.click(trigger);

    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getByRole("option", { name: /english/i })).toBeInTheDocument();
    expect(within(listbox).getByRole("option", { name: /русский/i })).toBeInTheDocument();
    expect(within(listbox).getByRole("option", { name: /deutsch/i })).toBeInTheDocument();
  });
  it('select "Deutsch" language', async () => {
    render(<LanguageSwitcher />);
    const trigger = await screen.findByRole("combobox");
    await userEvent.click(trigger);
    const listbox = await screen.findByRole("listbox");
    const deutsch = within(listbox).getByRole("option", { name: /deutsch/i });
    await userEvent.click(deutsch);

    const mockedSetLocale = setLocale as unknown as Mock;
    expect(mockedSetLocale).toHaveBeenCalledWith("de");
    expect(refresh).toHaveBeenCalled();

    expect(screen.getByText("Deutsch")).toBeInTheDocument();
  });
});
