import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { describe, expect, test } from "vitest";
import { SkillItem } from "../ui/skill-item";
import { categoriesMock } from "../mocks/categories.mock";
import { Mastery } from "@/shared/lib/types/skill";

describe("SkillItem", () => {
  const renderComponent = () => {
    return render(
      <SkillItem
        skill="TypeScript"
        mastery={Mastery.EXPERT}
        categories={categoriesMock}
        isEditable={false}
        isDisabled={false}
        onChange={() => {}}
      />
    );
  };

  test("should render skill item correctly", () => {
    renderComponent();

    expect(screen.getByTestId(/skill-button/i)).toBeInTheDocument();
    expect(screen.getByTestId(/skill-button/i)).toHaveTextContent(/typescript/i);
    expect(screen.getByTestId(/slider/i)).toBeInTheDocument();
  });

  test("buttons should be disabled in not editable mod",  () => {
    renderComponent();
    expect(screen.getByTestId(/skill-button/i)).toBeDisabled();
    expect(screen.queryByText(/expert/i)).toBeNull();
  });
});
