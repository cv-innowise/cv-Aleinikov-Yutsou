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
import { createDepartmentMock } from "../mocks/create-department.mock";
import { updateDepartmentMock } from "../mocks/update-department.mock";

vi.mock("");

describe("DepartmentForm (unit)", () => {
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

  test("Should submit form to create department correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.type(
      screen.getByPlaceholderText(/department name/i),
      "departmentName"
    );
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(createDepartmentMock).toHaveBeenCalledWith({
        name: "departmentName",
      });
    });
  });

  test("Should submit form to update department correctly", async () => {
    const user = userEvent.setup();
    renderComponent("3");

    await user.click(screen.getByText(/open/i));
    await user.clear(screen.getByPlaceholderText(/department name/i));
    await user.type(
      screen.getByPlaceholderText(/department name/i),
      "departmentName"
    );
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(updateDepartmentMock).toHaveBeenCalledWith({
        departmentId: "3",
        name: "departmentName",
      });
    });
  });

  test("Should show form errors correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(
        screen.getByText("Name is required")
      ).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/department name/i), "1");

    await vi.waitFor(() => {
      expect(
        screen.getByText("Name must be at least 4 characters")
      ).toBeInTheDocument();
    });
  });
});
