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
import { userEvent } from "@vitest/browser/context";
import { updateUserMock } from "../mocks/update-user.mock";
import { updateProfileMock } from "../mocks/update-profile.mock";

vi.mock("");

describe("ProfileForm (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <ProfileForm
        profile={profileMock}
        user={userMock}
        departments={departmentsMock}
        positions={positionsMock}
        isEditable={true}
      />
    );
  };

  // test("Should handle profile update correctly", async () => {
  //   const user = userEvent.setup();
  //   renderComponent();

  //   const fName = screen.getByTestId(/user-first-name-input/i);
  //   const lName = screen.getByTestId(/user-last-name-input/i);
  //   await user.clear(fName);
  //   await user.type(fName, "NewFirstName");
  //   await user.clear(lName);
  //   await user.type(lName, "NewLastName");
  //   await user.click(screen.getAllByText(userMock.department_name!)[0]);
  //   await user.click(screen.getAllByText(departmentsMock[4].name)[1]);
  //   await user.click(screen.getAllByText(userMock.position_name!)[0]);
  //   await user.click(screen.getAllByText(positionsMock[4].name)[1]);
  //   await user.click(screen.getByTestId(/update-button/i));

  //   await vi.waitFor(() => {
  //     expect(updateProfileMock).toHaveBeenCalledWith({
  //       userId: userMock.id,
  //       first_name: "NewFirstName",
  //       last_name: "NewLastName",
  //     });
  //     expect(updateUserMock).toHaveBeenCalledWith({
  //       userId: userMock.id,
  //       departmentId: departmentsMock[4].id,
  //       positionId: positionsMock[4].id,
  //       role: userMock.role,
  //     });
  //   });
  // });

  // test("Should show errors correctly", async () => {
  //   const user = userEvent.setup();
  //   renderComponent();

  //   const fName = screen.getByTestId(/user-first-name-input/i);
  //   const lName = screen.getByTestId(/user-last-name-input/i);
  //   await user.clear(fName);
  //   await user.type(fName, "1");
  //   await user.clear(lName);
  //   await user.type(lName, "1");
  //   await user.click(screen.getByTestId(/update-button/i));

  //   await vi.waitFor(() => {
  //     expect(
  //       screen.getByText("First name must be at least 4 characters")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText("Last name must be at least 4 characters")
  //     ).toBeInTheDocument();
  //     expect(updateUserMock).not.toHaveBeenCalled();
  //     expect(updateProfileMock).not.toHaveBeenCalled();
  //   });
  //   });

  test("Should not handle form if nothing changed", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/update-button/i));

    await vi.waitFor(() => {
      expect(updateUserMock).not.toHaveBeenCalled();
      expect(updateProfileMock).not.toHaveBeenCalled();
    });
  });
});
