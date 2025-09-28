import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { SkillsPreview } from "..";
import { screen } from "@testing-library/react";
import {
  skillsMock,
  skillsByCategoriesMock,
  categoriesMock,
  addSkillMock,
  updateSkillMock,
  deleteSkillMock,
} from "../mocks/skills-preview.mock";
import { userEvent } from "@vitest/browser/context";

describe("LanguagePreview (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (isEditable: boolean = true) => {
    render(
      <SkillsPreview
        skills={skillsMock}
        skillsByCategories={skillsByCategoriesMock}
        categories={categoriesMock}
        addSkill={addSkillMock}
        updateSkill={updateSkillMock}
        deleteSkill={deleteSkillMock}
        isEditable={isEditable}
      />
    );
  };

  test("Should render skills preview correctly in not editable mode", () => {
    renderComponent(false);

    expect(screen.getByText(/skills/i)).toBeInTheDocument();
    expect(
      screen.getByText("Frontend technologies")
    ).toBeInTheDocument();
    expect(
      screen.getByText(skillsByCategoriesMock["Programming languages"][0].name)
    ).toBeDisabled();
    expect(screen.getByText("Programming languages")).toBeInTheDocument();
    expect(screen.queryByText(/add new skill.../i)).toBeNull();
    expect(screen.queryByText(/delete skills/i)).toBeNull();
  });

  test("Should render skills preview correctly in editable mode", () => {
    renderComponent();

    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Frontend technologies")).toBeInTheDocument();
    expect(
      screen.getByText(skillsByCategoriesMock["Programming languages"][0].name)
    ).toBeInTheDocument();
    expect(screen.getByText("Programming languages")).toBeInTheDocument();
    expect(screen.getByText(/add new skill.../i)).toBeInTheDocument();
    expect(screen.getByText(/delete skills/i)).toBeInTheDocument();
  });

  test("Should only show available skills in editable mode", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/add new skill.../i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(skillsMock[1].name)).toHaveLength(1);
    });
  });
});
