import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { LanguagesPreview } from "..";
import { screen } from "@testing-library/react";
import {
  languagesMock,
  languagesWithProficiencyMock,
} from "../mocks/languages-preview.mock";
import { userEvent } from "@vitest/browser/context";

describe("LanguagePreview (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (isEditable: boolean = true) => {
    render(
      <LanguagesPreview
        languages={languagesMock}
        languagesWithProficiency={languagesWithProficiencyMock}
        addLanguage={async () => {}}
        updateLanguage={async () => {}}
        deleteLanguages={async () => {}}
        isEditable={isEditable}
      />
    );
  };

  test("Should render create languages preview correctly in not editable mode", () => {
    renderComponent(false);

    expect(screen.getByText(/languages/i)).toBeInTheDocument();
    expect(
      screen.getByText(languagesWithProficiencyMock[0].proficiency)
    ).toBeInTheDocument();
    expect(
      screen.getByText(languagesWithProficiencyMock[0].proficiency)
    ).toBeDisabled();
    expect(
      screen.getByText(languagesWithProficiencyMock[2].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(languagesWithProficiencyMock[2].name)
    ).toBeDisabled();
    expect(screen.queryByText(/add new language.../i)).toBeNull();
    expect(screen.queryByText(/delete languages/i)).toBeNull();
  });

  test("Should render create languages preview correctly in editable mode", () => {
    renderComponent();

    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(
      screen.getByText(languagesWithProficiencyMock[0].proficiency)
    ).toBeInTheDocument();
    expect(
      screen.getByText(languagesWithProficiencyMock[0].proficiency)
    ).not.toBeDisabled();
    expect(
      screen.getByText(languagesWithProficiencyMock[2].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(languagesWithProficiencyMock[2].name)
    ).not.toBeDisabled();
    expect(screen.getByText(/add new language.../i)).toBeInTheDocument();
    expect(screen.getByText(/delete languages/i)).toBeInTheDocument();
  });

  test("Should only show available languages in editable mode", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/add new language.../i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/german/i)).toHaveLength(1);
    });
  });
});
