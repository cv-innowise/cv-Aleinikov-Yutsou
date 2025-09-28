import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { LanguagesPreview } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import {
  addLanguageMock,
  deleteLanguagesMock,
  languagesMock,
  languagesWithProficiencyMock,
  updateLanguageMock,
} from "../mocks/languages-preview.mock";

describe("LanguagePreview (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <LanguagesPreview
        languages={languagesMock}
        languagesWithProficiency={languagesWithProficiencyMock}
        addLanguage={addLanguageMock}
        updateLanguage={updateLanguageMock}
        deleteLanguages={deleteLanguagesMock}
        isEditable={true}
      />
    );
  };

  test("Should change language name correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(languagesWithProficiencyMock[0].name));
    await user.click(screen.getByText(/English/i));

    await vi.waitFor(() => {
      expect(deleteLanguagesMock).toHaveBeenCalledWith({
        name: [languagesWithProficiencyMock[0].name],
      });
      expect(addLanguageMock).toHaveBeenCalledWith({
        name: "English",
        proficiency: languagesWithProficiencyMock[0].proficiency,
      });
    });
  });

  test("Should change language proficiency correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(
      screen.getByText(languagesWithProficiencyMock[0].proficiency)
    );
    await user.click(screen.getByText(/A2/i));

    await vi.waitFor(() => {
      expect(updateLanguageMock).toHaveBeenCalledWith({
        name: languagesWithProficiencyMock[0].name,
        proficiency: "A2",
      });
    });
  });

  test("Should add language correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/a1/i));
    await user.click(screen.getByText(/a2/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/a2/i)).toBeInTheDocument();
      expect(addLanguageMock).not.toHaveBeenCalled();
    });

    await user.click(screen.getByText(/add new language.../i));
    await user.click(screen.getByText(/English/i));

    await vi.waitFor(() => {
      expect(addLanguageMock).toHaveBeenCalledWith({
        name: "English",
        proficiency: "A2",
      });
    });
  });

  test("Should delete language correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getAllByTestId(/delete-button/i)[0]);
    await user.click(screen.getByTestId(/confirm-deleting-button/i));

    await vi.waitFor(() => {
      expect(deleteLanguagesMock).toHaveBeenCalledWith({
        name: [languagesWithProficiencyMock[0].name],
      });
    });
  });

  test("Should delete languages correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/start-selection-button/i));
    await user.click(screen.getAllByTestId(/select-button/i)[0]);
    await user.click(screen.getAllByTestId(/select-button/i)[2]);
    await user.click(screen.getByTestId(/delete-selected-button/i));

    await vi.waitFor(() => {
      expect(deleteLanguagesMock).toHaveBeenCalledWith({
        name: [
          languagesWithProficiencyMock[0].name,
          languagesWithProficiencyMock[2].name,
        ],
      });
    });
  });
});
