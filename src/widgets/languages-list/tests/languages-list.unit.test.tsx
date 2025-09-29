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
import { deleteLanguageMock } from "@/features/languages-columns/mocks/delete-language.mock";

vi.mock("");

describe("LanguagesList (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await LanguagesList({});
    return render(jsx);
  };

  test("should search languages by name", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.type(
      screen.getByPlaceholderText(/search/i),
      languagesMock[1].name
    );

    await vi.waitFor(() => {
      expect(screen.getByText(languagesMock[1].name)).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should sort positions correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText(/native name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/native-name/i)[0]).toHaveTextContent(
        "Deutsch"
      );
    });

    await user.click(screen.getByText(/native name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/native-name/i)[0]).toHaveTextContent(
        "Русский"
      );
    });

    await user.click(screen.getByText(/native name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/native-name/i)[0]).toHaveTextContent(
        languagesMock[0].name
      );
    });
  });

  test("should delete language correctly", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-language-button/i));
    await user.click(screen.getByTestId(/alert-dialog-confirm/i));

    await vi.waitFor(() => {
      expect(deleteLanguageMock).toHaveBeenCalledWith({
        languageId: languagesMock[1].id,
      });
    });
  });

  test("should not delete language on cancel", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-language-button/i));
    await user.click(screen.getByTestId(/alert-dialog-close/i));

    await vi.waitFor(() => {
      expect(deleteLanguageMock).not.toHaveBeenCalled();
    });
  });
});
