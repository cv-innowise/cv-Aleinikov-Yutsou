import "@/features/language-form/mocks/use-get-language.mock";
import "@/features/language-form/mocks/create-language.mock";
import "@/features/language-form/mocks/update-language.mock";
import "@/features/languages-columns/mocks/delete-language.mock";
import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@/shared/lib/queries/mocks/get-languages.mock";
import { languagesMock } from "@/shared/lib/queries/mocks/get-languages.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { LanguagesList } from "..";
import { userEvent } from "@vitest/browser/context";
import {
  adminUserMock,
  userMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";

vi.mock("");

describe("LanguagesList (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await LanguagesList({});
    return render(jsx);
  };

  test("should render languages list correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    await renderComponent();

    expect(screen.getByText(/languages/i)).toBeInTheDocument();
    expect(screen.getByText(languagesMock[1].name)).toBeInTheDocument();
    expect(screen.getByText(languagesMock[1].native_name)).toBeInTheDocument();
    expect(screen.getByText(languagesMock[1].iso2)).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)).toHaveLength(
      languagesMock.length
    );
  });

  test("should show dropdown menu after action button click", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      const updateLanguage = screen.getByTestId(/update-language-button/i);
      expect(updateLanguage).toBeInTheDocument();
      expect(updateLanguage).toBeDisabled();

      const deleteLanguage = screen.getByTestId(/delete-language-button/i);
      expect(deleteLanguage).toBeInTheDocument();
      expect(deleteLanguage).toBeDisabled();
    });
  });

  test("should show dropdown menu after action button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      expect(screen.getByTestId(/update-language-button/i)).not.toBeDisabled();
      expect(screen.getByTestId(/delete-language-button/i)).not.toBeDisabled();
    });
  });

  test("should show create language dialog after update language button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/create-language-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/create language/i)).toHaveLength(2);
    });
  });

  test("should show update language dialog after update language button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);
    await user.click(screen.getByTestId(/update-language-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/update language/i)).toHaveLength(2);
    });
  });
});
