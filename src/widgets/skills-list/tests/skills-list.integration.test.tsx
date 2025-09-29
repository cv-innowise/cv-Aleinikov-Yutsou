import "@/features/skill-form/mocks/use-get-skill.mock";
import "@/features/skill-form/mocks/use-get-skill-categories.mock";
import "@/features/skill-form/mocks/create-skill.mock";
import "@/features/skill-form/mocks/update-skill.mock";
import "@/features/skills-columns/mocks/delete-skill.mock";
import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@/shared/lib/queries/mocks/get-skills.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { SkillsList } from "..";
import { userEvent } from "@vitest/browser/context";
import {
  adminUserMock,
  userMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import { skillsMock } from "@/shared/lib/queries/mocks/get-skills.mock";

vi.mock("");

describe("SkillsList (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await SkillsList({});
    return render(jsx);
  };

  test("should render skills list correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    await renderComponent();

    expect(screen.getByText(/skills/i)).toBeInTheDocument();
    expect(screen.getByText(skillsMock[0].name)).toBeInTheDocument();
    expect(
      screen.getAllByText(skillsMock[0].category_name)[0]
    ).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)).toHaveLength(
      skillsMock.length
    );
  });

  test("should show dropdown menu after action button click", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      const updateSkill = screen.getByTestId(/update-skill-button/i);
      expect(updateSkill).toBeInTheDocument();
      expect(updateSkill).toBeDisabled();

      const deleteSkill = screen.getByTestId(/delete-skill-button/i);
      expect(deleteSkill).toBeInTheDocument();
      expect(deleteSkill).toBeDisabled();
    });
  });

  test("should show dropdown menu after action button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      expect(screen.getByTestId(/update-skill-button/i)).not.toBeDisabled();
      expect(screen.getByTestId(/delete-skill-button/i)).not.toBeDisabled();
    });
  });

  test("should show create skill dialog after update skill button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/create-skill-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/create skill/i)).toHaveLength(2);
    });
  });

  test("should show update skill dialog after update skill button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);
    await user.click(screen.getByTestId(/update-skill-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/update skill/i)).toHaveLength(2);
    });
  });
});
