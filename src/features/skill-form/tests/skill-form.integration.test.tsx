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
import { skillMock } from "../mocks/use-get-skill.mock";
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

  test("Should render create form correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/create skill/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/skill name/i)).toBeInTheDocument();
      expect(screen.getByTestId(/select-category-value/i)).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });

    await user.click(screen.getByTestId(/select-category-value/i));

    await vi.waitFor(() => {
      expect(
        screen.getAllByText(skillCategoriesMock[0].name)[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(skillCategoriesMock[2].name)[0]
      ).toBeInTheDocument();
    });
  });

  test("Should render update form correctly", async () => {
    const user = userEvent.setup();
    renderComponent("2");

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/update skill/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/skill name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/skill name/i)).toHaveValue(
        skillMock.name
      );
      expect(screen.getByTestId(/select-category-value/i)).toBeInTheDocument();
      expect(screen.getByTestId(/select-category-value/i)).toHaveTextContent(
        skillMock.category_name
      );
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });
});
