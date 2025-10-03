import "../mocks/use-get-free-cvs.mock";
import "../mocks/use-get-user.mock";
import "../mocks/create-user.mock";
import "../mocks/update-user.mock";
import "@/shared/lib/queries/mocks/get-departments.mock";
import "@/shared/lib/queries/mocks/get-positions.mock";
import { userMock } from "../mocks/use-get-user.mock";
import { render } from "vitest-browser-react";
import { UserForm } from "..";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { screen } from "@testing-library/dom";
import { freeCvsMock } from "../mocks/use-get-free-cvs.mock";
import { departmentsMock } from "@/shared/lib/queries/mocks/get-departments.mock";
import { positionsMock } from "@/shared/lib/queries/mocks/get-positions.mock";
import { updateUserMock } from "../mocks/update-user.mock";
import { UserRole } from "@/shared/types/cv-graphql";

vi.mock("");

describe("UpdateUserForm (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="open-dialog">Open</DialogTrigger>
        <UserForm userId="1" />
      </Dialog>
    );
  };

  test("should handle update user correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/open-dialog/i));
    await user.click(screen.getByTestId(/select-cvs-button/i));
    await user.click(screen.getByText(freeCvsMock[0].name));
    await user.click(screen.getByText(freeCvsMock[1].name));
    await user.click(screen.getByText(userMock.cvs[1].name));
    await user.click(screen.getByTestId(/select-cvs-button/i));
    await user.click(screen.getByTestId(/select-department-value/i));
    await user.click(screen.getAllByText(departmentsMock[2].name)[1]);
    await user.click(screen.getByTestId(/select-position-value/i));
    await user.click(screen.getAllByText(positionsMock[2].name)[1]);
    await user.click(screen.getByTestId(/admin-radio-item/i));
    await user.click(screen.getByTestId(/submit-button/i));

    await vi.waitFor(() => {
      expect(updateUserMock).toHaveBeenCalledWith({
        userId: "1",
        role: UserRole.Admin,
        cvsIds: [userMock.cvs[0].id, freeCvsMock[0].id, freeCvsMock[1].id],
        departmentId: departmentsMock[2].id,
        positionId: positionsMock[2].id,
      });
    });
  });
});
