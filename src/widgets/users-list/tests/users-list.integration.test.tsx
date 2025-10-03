import "@/features/user-form/mocks/use-get-free-cvs.mock";
import "@/features/user-form/mocks/use-get-user.mock";
import "@/features/user-form/mocks/create-user.mock";
import "@/features/user-form/mocks/update-user.mock";
import "@/shared/lib/queries/mocks/get-departments.mock";
import "@/shared/lib/queries/mocks/get-positions.mock";
import "@/features/users-columns/mocks/delete-user.mock";
import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "../mocks/use-get-users.mock";
import { usersMock } from "../mocks/use-get-users.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { UsersList } from "..";
import { userEvent } from "@vitest/browser/context";
import {
  adminUserMock,
  userMock,
  getAuthUserMock
} from "@/shared/lib/queries/mocks/get-auth-user.mock";

vi.mock("");

describe("UsersList (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await UsersList({});
    return render(jsx);
  };

  test("should render users list correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    await renderComponent();

    expect(screen.getByText(/users/i)).toBeInTheDocument();
    expect(screen.getByText(usersMock[0].email)).toBeInTheDocument();
    expect(
      screen.getByText(usersMock[0].profile.first_name!)
    ).toBeInTheDocument();
    expect(
      screen.getByText(usersMock[0].profile.last_name!)
    ).toBeInTheDocument();
    expect(screen.getAllByText(usersMock[0].position_name!)[0]).toBeInTheDocument();
    expect(screen.getAllByText(usersMock[0].department_name!)[0]).toBeInTheDocument();
    expect(screen.getByTestId(/action-button/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/profile-link-icon/i)).toHaveLength(usersMock.length - 1);
  });

  test("should render users list for admin correctly", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    await renderComponent();

    expect(screen.getByTestId(/create-user-button/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)).toHaveLength(
      usersMock.length
    );
  });

  test("should show dropdown menu when action button click", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/action-button/i));

    await vi.waitFor(() => {
      expect(screen.getByTestId("profile-link")).toBeInTheDocument();
      expect(screen.getByTestId(/update-user-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/delete-user-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/delete-user-button/i)).toBeDisabled();
    });
  });

  test("should show dropdown menu when action button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      expect(screen.getByTestId("profile-link")).toBeInTheDocument();
      expect(screen.getByTestId(/update-user-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/delete-user-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/delete-user-button/i)).not.toBeDisabled();
    });
  });

  test("should show create user dialog after update user button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/create-user-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/create user/i)).toHaveLength(2);
    });
  });

  test("should show update user dialog after update user button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[3]);
    await user.click(screen.getByTestId(/update-user-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/update user/i)).toHaveLength(2);
    });
  });
});
