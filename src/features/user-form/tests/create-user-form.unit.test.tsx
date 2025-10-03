import "../mocks/use-get-free-cvs.mock";
import "../mocks/use-get-user.mock";
import "../mocks/create-user.mock";
import "../mocks/update-user.mock";
import "@/shared/lib/queries/mocks/get-departments.mock";
import "@/shared/lib/queries/mocks/get-positions.mock";
import { render } from "vitest-browser-react";
import { UserForm } from "..";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, vi, test, expect } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { screen } from "@testing-library/react";
import { freeCvsMock } from "../mocks/use-get-free-cvs.mock";
import { departmentsMock } from "@/shared/lib/queries/mocks/get-departments.mock";
import { positionsMock } from "@/shared/lib/queries/mocks/get-positions.mock";
import { createUserMock } from "../mocks/create-user.mock";
import { UserRole } from "@/shared/types/cv-graphql";

vi.mock("");

describe("CreateUserForm (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const renderComponent = () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="open-dialog">Open</DialogTrigger>
        <UserForm />
      </Dialog>
    );
  };

  test("should handle create user correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/open-dialog/i));
    await user.type(screen.getByTestId(/user-email-input/i), "main@mail.com");
    await user.type(screen.getByTestId(/user-password-input/i), "Test123#");
    await user.type(screen.getByTestId(/user-first-name-input/i), "firstName");
    await user.type(screen.getByTestId(/user-last-name-input/i), "lastName");
    await user.click(screen.getByTestId(/select-cvs-button/i));
    await user.click(screen.getByText(freeCvsMock[0].name));
    await user.click(screen.getByText(freeCvsMock[1].name));
    await user.click(screen.getByTestId(/select-cvs-button/i));
    await user.click(screen.getByTestId(/select-department-value/i));
    await user.click(screen.getAllByText(departmentsMock[2].name)[1]);
    await user.click(screen.getByTestId(/select-position-value/i));
    await user.click(screen.getAllByText(positionsMock[2].name)[1]);
    await user.click(screen.getByTestId(/admin-radio-item/i));
    await user.click(screen.getByTestId(/submit-button/i));

    await vi.waitFor(() => {
      expect(createUserMock).toHaveBeenCalledWith({
        role: UserRole.Admin,
        auth: {
          email: "main@mail.com",
          password: "Test123#",
        },
        profile: {
          first_name: "firstName",
          last_name: "lastName",
        },
        cvsIds: [freeCvsMock[0].id, freeCvsMock[1].id],
        departmentId: departmentsMock[2].id,
        positionId: positionsMock[2].id,
      });
    });
  });

  test("should show errors correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/open-dialog/i));
    await user.click(screen.getByTestId(/submit-button/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/email is required/i));
      expect(screen.getByText(/password is required/i));
    });

    await user.type(screen.getByTestId(/user-email-input/i), "1");
    await user.type(screen.getByTestId(/user-password-input/i), "aaaaaa");
    await user.type(screen.getByTestId(/user-first-name-input/i), "1");
    await user.type(screen.getByTestId(/user-last-name-input/i), "1");

    await vi.waitFor(() => {
      expect(screen.getByText(/invalid email format/i));
      expect(screen.getByText(/password must include at least 1 digit/i));
      expect(screen.getByText(/first name must be at least 4 characters/i));
      expect(screen.getByText(/last name must be at least 4 characters/i));
    });
  });
});
