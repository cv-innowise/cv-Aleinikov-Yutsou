import "@/features/project-form/mocks/use-get-project.mock";
import "@/features/project-form/mocks/create-project.mock";
import "@/features/project-form/mocks/update-project.mock";
import "@/features/projects-columns/mocks/delete-project.mock";
import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "../mocks/get-project.mock";
import { getProjectMock, projectMock } from "../mocks/get-project.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { ProjectDetails } from "..";
import { userEvent } from "@vitest/browser/context";
import {
  adminUserMock,
  userMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";

vi.mock("");

describe("ProjectDetails (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await ProjectDetails({ projectId: "1" });
    return render(jsx);
  };

  test("should render project details correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    await renderComponent();

    expect(
      screen.getByText(`${projectMock.name} (${projectMock.internal_name})`)
    ).toBeInTheDocument();
    expect(screen.getByText(projectMock.domain)).toBeInTheDocument();
    expect(screen.getByText(`${projectMock.start_date} - Till now`)).toBeInTheDocument();
    expect(screen.getByText(projectMock.description)).toBeInTheDocument();
    expect(screen.getByText(projectMock.environment[0])).toBeInTheDocument();
    expect(screen.getByText(projectMock.environment[1])).toBeInTheDocument();
    expect(screen.getByText(projectMock.environment[2])).toBeInTheDocument();
  });

  test("should show update project dialog after update project button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/update-project-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/update project/i)).toHaveLength(2);
    });
  });

  test("should show not found message, if project doesn't exist", async () => {
    getProjectMock.mockImplementationOnce(() => undefined);
    await renderComponent();

    expect(screen.getByText(/sorry, project not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please, select project from available./i)
    ).toBeInTheDocument();
  });
});
