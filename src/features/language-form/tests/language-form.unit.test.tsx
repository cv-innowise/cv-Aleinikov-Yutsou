import "../mocks/use-get-language.mock";
import "../mocks/create-language.mock";
import "../mocks/update-language.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { LanguageForm } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { createLanguageMock } from "../mocks/create-language.mock";
import { updateLanguageMock } from "../mocks/update-language.mock";
import { Language } from "@/shared/graphql/languages/languages.types";

vi.mock("");

describe("LanguageForm (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (languageId?: Language["id"]) => {
    render(
      <Dialog>
        <DialogTrigger data-testid="open-dialog">Open</DialogTrigger>
        <LanguageForm languageId={languageId} />
      </Dialog>
    );
  };

  test("Should submit form to create language correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.type(
      screen.getByPlaceholderText(/language name/i),
      "languageName"
    );
    await user.type(
      screen.getByPlaceholderText(/language native name/i),
      "languageNativeName"
    );
    await user.type(screen.getByPlaceholderText(/language iso2 format/i), "nw");
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(createLanguageMock).toHaveBeenCalledWith({
        name: "languageName",
        native_name: "languageNativeName",
        iso2: "nw",
      });
    });
  });

  test("Should submit form to update language correctly", async () => {
    const user = userEvent.setup();
    renderComponent("1");

    await user.click(screen.getByText(/open/i));
    await user.clear(screen.getByPlaceholderText(/language name/i));
    await user.type(screen.getByPlaceholderText(/language name/i), "newName");
    await user.clear(screen.getByPlaceholderText(/language native name/i));
    await user.type(
      screen.getByPlaceholderText(/language native name/i),
      "newNatveName"
    );
    await user.clear(screen.getByPlaceholderText(/language iso2 format/i));
    await user.type(screen.getByPlaceholderText(/language iso2 format/i), "nw");
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(updateLanguageMock).toHaveBeenCalledWith({
        languageId: "1",
        name: "newName",
        native_name: "newNatveName",
        iso2: "nw",
      });
    });
  });

  test("Should show form errors correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("ISO2 is requred")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/language name/i), "1");
    await user.type(screen.getByPlaceholderText(/language native name/i), "1");
    await user.type(screen.getByPlaceholderText(/language iso2 format/i), "1");

    await vi.waitFor(() => {
      expect(
        screen.getByText("Name must be at least 4 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Name must be at least 4 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("ISO2 must have correct format")
      ).toBeInTheDocument();
    });
  });
});
