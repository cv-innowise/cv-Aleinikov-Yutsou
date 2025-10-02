import "../mocks/use-get-project.mock";
import "../mocks/create-project.mock";
import "../mocks/update-project.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ProjectForm } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { Project } from "@/shared/graphql/projects/projects.types";
// import { createProjectMock } from "../mocks/create-project.mock";
// import { updateProjectMock } from "../mocks/update-project.mock";

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

  // test("Should submit form to create project correctly", async () => {
  //   const user = userEvent.setup();
  //   renderComponent();

  //   await user.click(screen.getByText(/open/i));
  //   await user.type(
  //     screen.getByPlaceholderText(/project name/i),
  //     "projectName"
  //   );
  //   await user.type(
  //     screen.getByPlaceholderText(/project domain/i),
  //     "projectDomain"
  //   );
  //   await user.click(screen.getByTestId(/start-date-button/i));
  //   await user.click(screen.getByText("12"));
  //   await user.click(screen.getByTestId(/start-date-button/i));
  //   await user.click(screen.getByTestId(/end-date-button/i));
  //   await user.click(screen.getByText("21"));
  //   await user.click(screen.getByTestId(/end-date-button/i));
  //   await user.type(
  //     screen.getByPlaceholderText(/write something about this project.../i),
  //     "projectDescription"
  //   );
  //   const environment = screen.getByPlaceholderText(
  //     /press \"enter\" to add environment/i
  //   );
  //   await user.type(environment, "env1{Enter}");
  //   await user.type(environment, "env2{Enter}");
  //   await user.type(environment, "env3{Enter}");
  //   await user.click(screen.getByText(/confirm/i));

  //   await vi.waitFor(() => {
  //     const currDate = new Date();
  //     currDate.setDate(12);
  //     const startDate = currDate.toDateString();
  //     currDate.setDate(21);
  //     const endDate = currDate.toDateString();

  //     expect(createProjectMock).toHaveBeenCalledWith({
  //       name: "projectName",
  //       domain: "projectDomain",
  //       start_date: startDate,
  //       end_date: endDate,
  //       description: "projectDescription",
  //       environment: ["env1", "env2", "env3"],
  //     });
  //   });
  // });

  // test("Should submit form to create project correctly", async () => {
  //   const user = userEvent.setup();
  //   renderComponent("1");

  //   await user.click(screen.getByText(/open/i));
  //   await user.clear(screen.getByPlaceholderText(/project name/i));
  //   await user.type(screen.getByPlaceholderText(/project name/i), "newName");
  //   await user.clear(screen.getByPlaceholderText(/project domain/i));
  //   await user.type(
  //     screen.getByPlaceholderText(/project domain/i),
  //     "newDomain"
  //   );
  //   await user.click(screen.getByTestId(/start-date-button/i));
  //   await user.click(screen.getByText("12"));
  //   await user.click(screen.getByTestId(/start-date-button/i));
  //   await user.click(screen.getByTestId(/end-date-button/i));
  //   await user.click(screen.getAllByText("21")[1]);
  //   await user.click(screen.getByTestId(/end-date-button/i));
  //   await user.clear(
  //     screen.getByPlaceholderText(/write something about this project.../i)
  //   );
  //   await user.type(
  //     screen.getByPlaceholderText(/write something about this project.../i),
  //     "newDescription"
  //   );
  //   const environment = screen.getByPlaceholderText(
  //     /press \"enter\" to add environment/i
  //   );
  //   await user.type(environment, "env1{Enter}");
  //   await user.type(environment, "env2{Enter}");
  //   await user.type(environment, "env3{Enter}");
  //   await user.click(screen.getByText(/javascript/i));
  //   await user.click(screen.getByText(/confirm/i));

  //   await vi.waitFor(() => {
  //     const currDate = new Date();
  //     currDate.setDate(12);
  //     const startDate = currDate.toDateString();
  //     currDate.setDate(21);
  //     const endDate = currDate.toDateString();

  //     expect(updateProjectMock).toHaveBeenCalledWith({
  //       projectId: "1",
  //       name: "newName",
  //       domain: "newDomain",
  //       start_date: startDate,
  //       end_date: endDate,
  //       description: "newDescription",
  //       environment: ["TypeScript", "env1", "env2", "env3"],
  //     });
  //   });
  // });

  test("Should show form errors correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Domain is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Start date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    });
  });
});
