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
  userMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";

vi.mock("");

describe("ProjectsList (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await ProjectsList({});
    return render(jsx);
  };

  test("should render projects list correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    await renderComponent();

    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(projectsMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(projectsMock[0].internal_name)).toBeInTheDocument();
    expect(screen.getByText(projectsMock[0].domain)).toBeInTheDocument();
    expect(screen.getByText(projectsMock[0].start_date)).toBeInTheDocument();
    expect(screen.getByText(projectsMock[0].end_date)).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)).toHaveLength(
      projectsMock.length
    );
  });

  test("should show dropdown menu after action button click", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      const updateProject = screen.getByTestId(/update-project-button/i);
      expect(updateProject).toBeInTheDocument();
      expect(updateProject).toBeDisabled();

      const deleteProject = screen.getByTestId(/delete-project-button/i);
      expect(deleteProject).toBeInTheDocument();
      expect(deleteProject).toBeDisabled();
    });
  });

  test("should show dropdown menu after action button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      expect(screen.getByTestId(/update-project-button/i)).not.toBeDisabled();
      expect(screen.getByTestId(/delete-project-button/i)).not.toBeDisabled();
    });
  });

  test("should show create project dialog after update project button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/create-project-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/create project/i)).toHaveLength(2);
    });
  });

  test("should show update project dialog after update project button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);
    await user.click(screen.getByTestId(/update-project-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/update project/i)).toHaveLength(2);
    });
  });
});
