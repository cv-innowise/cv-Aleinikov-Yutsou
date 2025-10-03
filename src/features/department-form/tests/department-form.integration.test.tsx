import "../mocks/use-get-department.mock";
import "../mocks/create-department.mock";
import "../mocks/update-department.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { DepartmentForm } from "..";
import { Department } from "@/shared/graphql/departments/departments.types";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { departmentMock } from "../mocks/use-get-department.mock";

vi.mock("");

describe("DepartmentForm (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (departmentId?: Department["id"]) => {
    render(
      <Dialog>
        <DialogTrigger data-testid="open-dialog">Open</DialogTrigger>
        <DepartmentForm departmentId={departmentId} />
      </Dialog>
    );
  };

  test("Should render create form correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/create department/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/department name/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });

  test("Should render update form correctly", async () => {
    const user = userEvent.setup();
    renderComponent("3");

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/update department/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/department name/i)
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/department name/i)).toHaveValue(
        departmentMock.name
      );
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });
});
