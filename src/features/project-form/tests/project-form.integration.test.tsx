import "../mocks/use-get-project.mock";
import "../mocks/create-project.mock";
import "../mocks/update-project.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ProjectForm } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { projectMock } from "../mocks/use-get-project.mock";
import { Project } from "@/shared/graphql/projects/projects.types";

vi.mock("");

describe("PositionForm (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (projectId?: Project["id"]) => {
    render(
      <Dialog>
        <DialogTrigger data-testid="open-dialog">Open</DialogTrigger>
        <ProjectForm projectId={projectId} />
      </Dialog>
    );
  };

  test("Should render create form correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/create project/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/project name/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/project domain/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId(/start-date-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/end-date-button/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/write something about this project.../i)
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/press \"enter\" to add environment/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });

  test("Should render update form correctly", async () => {
    const user = userEvent.setup();
    renderComponent("1");

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/update project/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/project name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/project name/i)).toHaveValue(
        projectMock.name
      );
      expect(
        screen.getByPlaceholderText(/project domain/i)
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/project domain/i)).toHaveValue(
        projectMock.domain
      );
      expect(screen.getByTestId(/start-date-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/start-date-button/i)).toHaveTextContent(
        "February 27th, 2019"
      );
      expect(screen.getByTestId(/end-date-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/end-date-button/i)).toHaveTextContent(
        "November 13th, 2023"
      );
      expect(
        screen.getByPlaceholderText(/write something about this project.../i)
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/write something about this project.../i)
      ).toHaveValue(projectMock.description);
      expect(
        screen.getByPlaceholderText(/press \"enter\" to add environment/i)
      ).toBeInTheDocument();
      expect(screen.getByText(projectMock.environment[0])).toBeInTheDocument();
      expect(screen.getByText(projectMock.environment[1])).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });
});
