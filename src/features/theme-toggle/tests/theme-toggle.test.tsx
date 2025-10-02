import React from "react";
import { ThemeProvider } from "@/app/providers/theme/theme-provider";
import { cleanup, render, screen, within } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { ThemeToggle } from "../ui/theme-toggle";
import { userEvent } from "@vitest/browser/context";

const setThemeMock = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "system",
    resolvedTheme: "light",
    setTheme: (v: string) => {
      setThemeMock(v);
      localStorage.setItem("theme", v);
    },
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

afterEach(() => {
  cleanup();
  setThemeMock.mockClear();
  localStorage.clear();
});

describe("ThemeToggle", () => {
  it("renders theme toggle correctly", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(await screen.findByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });
  it("display all theme options", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const trigger = await screen.findByRole("combobox");
    await userEvent.click(trigger);

    const listbox = await screen.findByRole("listbox");

    expect(within(listbox).getByRole("option", { name: /light/i })).toBeInTheDocument();
    expect(within(listbox).getByRole("option", { name: /dark/i })).toBeInTheDocument();
    expect(within(listbox).getByRole("option", { name: /system/i })).toBeInTheDocument();
  });
  it('select "light" theme', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const trigger = await screen.findByRole("combobox");
    await userEvent.click(trigger);
    const listbox = await screen.findByRole("listbox");
    const lightOption = within(listbox).getByRole("option", { name: /light/i });
    await userEvent.click(lightOption);

    expect(setThemeMock).toHaveBeenCalledWith("light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(setThemeMock).toHaveBeenCalledTimes(1);
  });
  it('select "dark" theme', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const trigger = await screen.findByRole("combobox");
    await userEvent.click(trigger);
    const listbox = await screen.findByRole("listbox");
    const darkOption = within(listbox).getByRole("option", { name: /dark/i });
    await userEvent.click(darkOption);

    expect(setThemeMock).toHaveBeenCalledWith("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(setThemeMock).toHaveBeenCalledTimes(1);
  });
});
