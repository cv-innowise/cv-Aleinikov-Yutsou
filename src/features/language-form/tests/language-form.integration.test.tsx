import "../mocks/use-get-language.mock";
import "../mocks/create-language.mock";
import "../mocks/update-language.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { LanguageForm } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { Language } from "@/shared/graphql/languages/languages.types";
import { languageMock } from "../mocks/use-get-language.mock";

vi.mock("");

describe("LanguageForm (integration)", () => {
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

  test("Should render create form correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/create language/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/language name/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/language native name/i)
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/language iso2 format/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });

  test("Should render update form correctly", async () => {
    const user = userEvent.setup();
    renderComponent("1");

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/update language/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/language name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/language name/i)).toHaveValue(
        languageMock.name
      );
      expect(
        screen.getByPlaceholderText(/language native name/i)
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/language native name/i)).toHaveValue(
        languageMock.native_name
      );
      expect(
        screen.getByPlaceholderText(/language iso2 format/i)
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/language iso2 format/i)).toHaveValue(
        languageMock.iso2
      );
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });
});
