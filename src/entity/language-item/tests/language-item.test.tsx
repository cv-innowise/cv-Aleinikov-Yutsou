import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { describe, expect, test } from "vitest";
import { LanguageItem } from "../ui/language-item";
import { languagesMock } from "../mocks/languages.mock";
import { Proficiency } from "@/shared/types/language";

describe("LanguageItem", () => {
  const renderComponent = () => {
    return render(
      <LanguageItem
        name="Russian"
        proficiency={Proficiency.Native}
        languages={languagesMock}
        isEditable={false}
        isDisabled={false}
        onChange={() => {}}
      />
    );
  };

  test("should render language item correctly", () => {
    renderComponent();

    expect(screen.getByTestId(/language-button/i)).toBeInTheDocument();
    expect(screen.getByTestId(/language-button/i)).toHaveTextContent(
      /russian/i
    );
    expect(screen.getByTestId(/proficiency-button/i)).toBeInTheDocument();
    expect(screen.getByTestId(/proficiency-button/i)).toHaveTextContent(
      /native/i
    );
  });

  test("buttons should be disabled in not editable mode", () => {
    renderComponent();
    expect(screen.getByTestId(/language-button/i)).toBeDisabled();
    expect(screen.getByTestId(/proficiency-button/i)).toBeDisabled();
  });
});
