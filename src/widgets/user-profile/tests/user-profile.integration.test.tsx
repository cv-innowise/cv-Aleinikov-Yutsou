import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "../mocks/get-user.mock";
import "@/shared/lib/queries/mocks/get-profile.mock";
import "@/shared/lib/queries/mocks/get-departments.mock";
import "@/shared/lib/queries/mocks/get-positions.mock";
import "@/features/profile-form/mocks/update-profile.mock";
import "@/features/profile-form/mocks/update-user.mock";
import "@/features/profile-avatar/mocks/upload-avatar.mock";
import "@/features/profile-avatar/mocks/delete-avatar.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { UserProfile } from "..";
import {
  adminUserMock,
  userMock as authUserMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import { userMock } from "../mocks/get-user.mock";
import {
  getProfileMock,
  profileMock,
} from "@/shared/lib/queries/mocks/get-profile.mock";

vi.mock("");

describe("UserProfile (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await UserProfile({ userId: "1" });
    return render(jsx);
  };

  test("should render user profile correctly for this user", async () => {
    await renderComponent();

    expect(screen.getByTestId(/upload-avatar/i)).toBeInTheDocument();
    expect(screen.getByTestId(/delete-avatar/i)).toBeInTheDocument();
    expect(screen.getByText(profileMock.full_name)).toBeInTheDocument();
    expect(screen.getByText(userMock.email)).toBeInTheDocument();
    expect(screen.getByText(/mon sep 15 2025/i)).toBeInTheDocument();
    const fName = screen.getByTestId(/user-first-name-input/i);
    const lName = screen.getByTestId(/user-last-name-input/i);
    expect(fName).toBeInTheDocument();
    expect(fName).toHaveValue(profileMock.first_name);
    expect(lName).toBeInTheDocument();
    expect(lName).toHaveValue(profileMock.last_name);
    expect(screen.getByTestId(/select-department-value/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(userMock.department_name!)[0]
    ).toBeInTheDocument();
    expect(screen.getByTestId(/select-position-value/i)).toBeInTheDocument();
    expect(screen.getAllByText(userMock.position_name!)[0]).toBeInTheDocument();
    expect(screen.getByTestId(/update-button/i)).toBeInTheDocument();
  });

  test("should render user profile correctly for another user", async () => {
    getAuthUserMock.mockImplementationOnce(() => ({
      ...authUserMock,
      id: "1234",
    }));
    await renderComponent();

    expect(screen.queryByTestId(/upload-avatar/i)).toBeNull();
    expect(screen.queryByTestId(/delete-avatar/i)).toBeNull();
    expect(screen.getByText(profileMock.full_name)).toBeInTheDocument();
    expect(screen.getByText(userMock.email)).toBeInTheDocument();
    expect(screen.getByText(/mon sep 15 2025/i)).toBeInTheDocument();
    const fName = screen.getByTestId(/user-first-name-input/i);
    const lName = screen.getByTestId(/user-last-name-input/i);
    expect(fName).toBeInTheDocument();
    expect(fName).toBeDisabled();
    expect(fName).toHaveValue(profileMock.first_name);
    expect(lName).toBeInTheDocument();
    expect(lName).toBeDisabled();
    expect(lName).toHaveValue(profileMock.last_name);
    expect(screen.getByTestId(/select-department-value/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(userMock.department_name!)[0]
    ).toBeInTheDocument();
    expect(screen.getByTestId(/select-position-value/i)).toBeInTheDocument();
    expect(screen.getAllByText(userMock.position_name!)[0]).toBeInTheDocument();
    expect(screen.queryByTestId(/update-button/i)).toBeNull();
  });

  test("should render user profile correctly for admin", async () => {
    getAuthUserMock.mockImplementationOnce(() => adminUserMock);
    await renderComponent();

    expect(screen.getByTestId(/upload-avatar/i)).toBeInTheDocument();
    expect(screen.getByTestId(/delete-avatar/i)).toBeInTheDocument();
    expect(screen.getByText(profileMock.full_name)).toBeInTheDocument();
    expect(screen.getByText(userMock.email)).toBeInTheDocument();
    expect(screen.getByText(/mon sep 15 2025/i)).toBeInTheDocument();
    const fName = screen.getByTestId(/user-first-name-input/i);
    const lName = screen.getByTestId(/user-last-name-input/i);
    expect(fName).toBeInTheDocument();
    expect(fName).toHaveValue(profileMock.first_name);
    expect(lName).toBeInTheDocument();
    expect(lName).toHaveValue(profileMock.last_name);
    expect(screen.getByTestId(/select-department-value/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(userMock.department_name!)[0]
    ).toBeInTheDocument();
    expect(screen.getByTestId(/select-position-value/i)).toBeInTheDocument();
    expect(screen.getAllByText(userMock.position_name!)[0]).toBeInTheDocument();
    expect(screen.getByTestId(/update-button/i)).toBeInTheDocument();
  });

  test("should show not found messag, if user doesn't exist", async () => {
    getProfileMock.mockImplementationOnce(() => undefined);
    await renderComponent();

    expect(screen.getByText(/sorry, user not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/maybe you've ment to see your profile?/i)
    ).toBeInTheDocument();
  });
});
