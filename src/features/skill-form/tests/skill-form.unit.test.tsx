import "../mocks/use-get-skill.mock";
import "../mocks/use-get-skill-categories.mock";
import "../mocks/create-skill.mock";
import "../mocks/update-skill.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { SkillForm } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { createSkillMock } from "../mocks/create-skill.mock";
import { updateSkillMock } from "../mocks/update-skill.mock";
import { Skill } from "@/shared/graphql/skills/skills.types";
import { skillCategoriesMock } from "../mocks/use-get-skill-categories.mock";

vi.mock("");

describe("SkillForm (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (skillId?: Skill["id"]) => {
    render(
      <Dialog>
        <DialogTrigger data-testid="open-dialog">Open</DialogTrigger>
        <SkillForm skillId={skillId} />
      </Dialog>
    );
  };

  test("Should submit form to create position correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.type(screen.getByPlaceholderText(/skill name/i), "skillName");
    await user.click(screen.getByTestId(/select-category-value/i));
    await user.click(screen.getAllByText(skillCategoriesMock[1].name)[1]);
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(createSkillMock).toHaveBeenCalledWith({
        name: "skillName",
        categoryId: skillCategoriesMock[1].id,
      });
    });
  });

  test("Should submit form to update position correctly", async () => {
    const user = userEvent.setup();
    renderComponent("1");

    await user.click(screen.getByText(/open/i));
    await user.clear(screen.getByPlaceholderText(/skill name/i));
    await user.type(screen.getByPlaceholderText(/skill name/i), "newName");
    await user.click(screen.getByTestId(/select-category-value/i));
    await user.click(screen.getAllByText(skillCategoriesMock[1].name)[1]);
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(updateSkillMock).toHaveBeenCalledWith({
        skillId: "1",
        name: "newName",
        categoryId: skillCategoriesMock[1].id,
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
      expect(screen.getByText("Category is required")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/skill name/i), "1");

    await vi.waitFor(() => {
      expect(
        screen.getByText("Name must be at least 4 characters")
      ).toBeInTheDocument();
    });
  });
});
