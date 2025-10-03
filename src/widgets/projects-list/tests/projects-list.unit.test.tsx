import "@/features/project-form/mocks/use-get-project.mock";
import "@/features/project-form/mocks/create-project.mock";
import "@/features/project-form/mocks/update-project.mock";
import "@/features/projects-columns/mocks/delete-project.mock";
import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "../mocks/get-projects.mock";
import { projectsMock } from "../mocks/get-projects.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { ProjectsList } from "..";
import { userEvent } from "@vitest/browser/context";
import {
  adminUserMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import { deleteProjectMock } from "@/features/projects-columns/mocks/delete-project.mock";

vi.mock("");

describe("ProjectsList (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await ProjectsList({});
    return render(jsx);
  };

  test("should search projects by name", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.type(
      screen.getByPlaceholderText(/search/i),
      projectsMock[0].name
    );

    await vi.waitFor(() => {
      expect(screen.getByText(projectsMock[0].name)).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should search projects by internal name", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.type(
      screen.getByPlaceholderText(/search/i),
      projectsMock[0].internal_name
    );

    await vi.waitFor(() => {
      expect(
        screen.getByText(projectsMock[0].internal_name)
      ).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should sort projects correctly", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText(/domain/i));

     await vi.waitFor(() => {
      expect(screen.getAllByTestId(/domain/i)[0]).toHaveTextContent(
        "AR (Augmented Reality)"
      );
    });

    await user.click(screen.getByText(/domain/i));

     await vi.waitFor(() => {
      expect(screen.getAllByTestId(/domain/i)[0]).toHaveTextContent(
        "Education"
      );
    });

    await user.click(screen.getByText(/domain/i));

     await vi.waitFor(() => {
      expect(screen.getAllByTestId(/domain/i)[0]).toHaveTextContent(
        projectsMock[0].domain
      );
    });
  });

  test("should delete project correctly", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-project-button/i));
    await user.click(screen.getByTestId(/alert-dialog-confirm/i));

    await vi.waitFor(() => {
      expect(deleteProjectMock).toHaveBeenCalledWith({
        projectId: projectsMock[1].id,
      });
    });
  });

  test("should not delete project on cancel", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-project-button/i));
    await user.click(screen.getByTestId(/alert-dialog-close/i));

    await vi.waitFor(() => {
      expect(deleteProjectMock).not.toHaveBeenCalled();
    });
  });
});
