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

vi.mock("");

describe("DepartmentsList (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await DepartmentsList({});
    return render(jsx);
  };

  test("should render departments list correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    await renderComponent();

    expect(screen.getByText(/departments/i)).toBeInTheDocument();
    expect(screen.getByText(departmentsMock[0].name)).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)).toHaveLength(
      departmentsMock.length
    );
  });

  test("should show dropdown menu after action button click", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      const updateDepartment = screen.getByTestId(/update-department-button/i);
      expect(updateDepartment).toBeInTheDocument();
      expect(updateDepartment).toBeDisabled();

      const deleteDepartment = screen.getByTestId(/delete-department-button/i);
      expect(deleteDepartment).toBeInTheDocument();
      expect(deleteDepartment).toBeDisabled();
    });
  });

  test("should show dropdown menu after action button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      expect(
        screen.getByTestId(/update-department-button/i)
      ).not.toBeDisabled();
      expect(
        screen.getByTestId(/delete-department-button/i)
      ).not.toBeDisabled();
    });
  });

  test("should show create department dialog after update department button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/create-department-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/create department/i)).toHaveLength(2);
    });
  });

  test("should show update department dialog after update department button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);
    await user.click(screen.getByTestId(/update-department-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/update department/i)).toHaveLength(2);
    });
  });
});
