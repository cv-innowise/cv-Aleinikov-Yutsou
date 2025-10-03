import "../mocks/update-profile.mock";
import "../mocks/update-user.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ProfileForm } from "..";
import { screen } from "@testing-library/react";
import {
  departmentsMock,
  positionsMock,
  profileMock,
  userMock,
} from "../mocks/profile-form.mock";

vi.mock("");

describe("ProfileForm (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (isEditable: boolean = true) => {
    render(
      <ProfileForm
        profile={profileMock}
        user={userMock}
        departments={departmentsMock}
        positions={positionsMock}
        isEditable={isEditable}
      />
    );
  };

  test("Should render form correctly in not editable mode", () => {
    renderComponent(false);

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

  test("Should render form correctly in not editable mode", () => {
    renderComponent();

    expect(screen.getByTestId(/user-first-name-input/i)).not.toBeDisabled();
    expect(screen.getByTestId(/user-last-name-input/i)).not.toBeDisabled();
    expect(screen.getByTestId(/select-department-value/i)).not.toBeDisabled();
    expect(screen.getByTestId(/select-position-value/i)).not.toBeDisabled();
    expect(screen.getByTestId(/update-button/i)).toBeInTheDocument();
  });
});
