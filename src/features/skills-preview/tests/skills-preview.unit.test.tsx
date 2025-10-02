import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { SkillsPreview } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import {
  skillsMock,
  skillsByCategoriesMock,
  categoriesMock,
  addSkillMock,
  updateSkillMock,
  deleteSkillMock,
} from "../mocks/skills-preview.mock";
import { Mastery } from "@/shared/types/cv-graphql";

describe("LanguagePreview (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await SkillsPreview({
      skills: skillsMock,
      skillsByCategories: skillsByCategoriesMock,
      categories: categoriesMock,
      addSkill: addSkillMock,
      updateSkill: updateSkillMock,
      deleteSkill: deleteSkillMock,
      isEditable: true,
    });

    render(jsx);
  };

  test("Should change skill name correctly", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(
      screen.getByText(
        skillsByCategoriesMock["State management libraries"][1].name
      )
    );
    await user.click(screen.getByText(skillsMock[0].name));

    await vi.waitFor(() => {
      expect(deleteSkillMock).toHaveBeenCalledWith({
        name: [skillsByCategoriesMock["State management libraries"][1].name],
      });
      expect(addSkillMock).toHaveBeenCalledWith({
        name: skillsMock[0].name,
        categoryId: skillsMock[0].category.id,
        mastery:
          skillsByCategoriesMock["State management libraries"][1].mastery,
      });
    });
  });

  test("Should change skill proficieny correctly", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(
      screen.getAllByTestId(/slider/i).at(-1)!.firstElementChild!,
      {
        position: {
          x: 0,
          y: 0,
        },
      }
    );

    await vi.waitFor(() => {
      expect(updateSkillMock).toHaveBeenCalledWith({
        name: skillsByCategoriesMock["Programming languages"][0].name,
        categoryId:
          skillsByCategoriesMock["Programming languages"][0].categoryId,
        mastery: Mastery.Novice,
      });
    });
  });

  test("Should add skill correctly", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText(/add new skill.../i));
    await user.click(screen.getByText(skillsMock[3].name));

    await vi.waitFor(() => {
      expect(addSkillMock).toHaveBeenCalledWith({
        name: skillsMock[3].name,
        categoryId: skillsMock[3].category.id,
        mastery: Mastery.Novice,
      });
    });
  });

  test("Should delete skill correctly", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/delete-button/i)[0]);
    await user.click(screen.getByTestId(/confirm-deleting-button/i));

    await vi.waitFor(() => {
      expect(deleteSkillMock).toHaveBeenCalledWith({
        name: [skillsByCategoriesMock["Frontend technologies"][0].name],
      });
    });
  });

  test("Should delete skills correctly", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/start-selection-button/i));
    await user.click(screen.getAllByTestId(/select-button/i)[2]);
    await user.click(screen.getByTestId(/delete-selected-button/i));

    await vi.waitFor(() => {
      expect(deleteSkillMock).toHaveBeenCalledWith({
        name: [skillsByCategoriesMock["State management libraries"][1].name],
      });
    });
  });
});
