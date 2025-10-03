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
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import { deleteUserMock } from "@/features/users-columns/mocks/delete-user.mock";

vi.mock("");

describe("UsersList (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await UsersList({});
    return render(jsx);
  };

  test("should search users by full name", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.type(
      screen.getByPlaceholderText(/search/i),
      usersMock[0].profile.first_name!
    );

    await vi.waitFor(() => {
      expect(screen.getByText(usersMock[0].email)).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should sort users correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText(/first name/i));

     await vi.waitFor(() => {
      expect(screen.getAllByTestId(/first-name/i)[0]).toHaveTextContent("");
    });

    await user.click(screen.getByText(/first name/i));

     await vi.waitFor(() => {
      expect(screen.getAllByTestId(/first-name/i)[0]).toHaveTextContent("xsxs");
    });

    await user.click(screen.getByText(/first name/i));

     await vi.waitFor(() => {
      expect(screen.getAllByTestId(/first-name/i)[0]).toHaveTextContent(
        usersMock[0].profile.first_name!
      );
    });
  });

  test("should delete user correctly", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[3]);
    await user.click(screen.getByTestId(/delete-user-button/i));
    await user.click(screen.getByTestId(/alert-dialog-confirm/i));

    await vi.waitFor(() => {
      expect(deleteUserMock).toHaveBeenCalledWith({ userId: usersMock[3].id });
    });
  });

  test("should not delete user on cancel", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[3]);
    await user.click(screen.getByTestId(/delete-user-button/i));
    await user.click(screen.getByTestId(/alert-dialog-close/i));

    await vi.waitFor(() => {
      expect(deleteUserMock).not.toHaveBeenCalled();
    });
  });
});
