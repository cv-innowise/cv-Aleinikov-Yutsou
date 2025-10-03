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
import { deleteSkillMock } from "@/features/skills-columns/mocks/delete-skill.mock";

vi.mock("");

describe("SkillsList (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await SkillsList({});
    return render(jsx);
  };

  test("should search skills by name", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.type(
      screen.getByPlaceholderText(/search/i),
      skillsMock[0].name!
    );

    await vi.waitFor(() => {
      expect(screen.getByText(skillsMock[0].name)).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should sort skills correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText(/category/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/category-name/i)[0]).toHaveTextContent(
        "Frontend technologies"
      );
    });

    await user.click(screen.getByText(/category/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/category-name/i)[0]).toHaveTextContent(
        "State management libraries"
      );
    });

    await user.click(screen.getByText(/category/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/category-name/i)[0]).toHaveTextContent(
        skillsMock[0].category_name
      );
    });
  });

  test("should delete skill correctly", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-skill-button/i));
    await user.click(screen.getByTestId(/alert-dialog-confirm/i));

    await vi.waitFor(() => {
      expect(deleteSkillMock).toHaveBeenCalledWith({
        skillId: skillsMock[1].id,
      });
    });
  });

  test("should not delete skill on cancel", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-skill-button/i));
    await user.click(screen.getByTestId(/alert-dialog-close/i));

    await vi.waitFor(() => {
      expect(deleteSkillMock).not.toHaveBeenCalled();
    });
  });
});
