import "@/features/department-form/mocks/use-get-department.mock";
import "@/features/department-form/mocks/create-department.mock";
import "@/features/department-form/mocks/update-department.mock";
import "@/features/departments-columns/mocks/delete-department.mock";
import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@/shared/lib/queries/mocks/get-departments.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { DepartmentsList } from "..";
import { userEvent } from "@vitest/browser/context";
import {
  adminUserMock,
  userMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import { departmentsMock } from "@/shared/lib/queries/mocks/get-departments.mock";
import { deleteDepartmentMock } from "@/features/departments-columns/mocks/delete-department.mock";

vi.mock("");

describe("DepartmentsList (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await DepartmentsList({});
    return render(jsx);
  };

  test("should search departments by name", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.type(
      screen.getByPlaceholderText(/search/i),
      departmentsMock[0].name
    );

    await vi.waitFor(() => {
      expect(screen.getByText(departmentsMock[0].name)).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should sort departments correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText(/name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/name/i)[0]).toHaveTextContent("Blockchain");
    });

    await user.click(screen.getByText(/name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/name/i)[0]).toHaveTextContent(
        "Quality Assurance"
      );
    });

    await user.click(screen.getByText(/name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/name/i)[0]).toHaveTextContent(
        departmentsMock[0].name
      );
    });
  });

  test("should delete department correctly", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-department-button/i));
    await user.click(screen.getByTestId(/alert-dialog-confirm/i));

    await vi.waitFor(() => {
      expect(deleteDepartmentMock).toHaveBeenCalledWith({
        departmentId: departmentsMock[1].id,
      });
    });
  });

  test("should not delete department on cancel", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-department-button/i));
    await user.click(screen.getByTestId(/alert-dialog-close/i));

    await vi.waitFor(() => {
      expect(deleteDepartmentMock).not.toHaveBeenCalled();
    });
  });
});
