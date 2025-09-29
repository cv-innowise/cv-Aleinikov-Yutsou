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

vi.mock("");

describe("UpdateUserForm (integration)", () => {
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

  test("should render update user form correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/open-dialog/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/update user/i)).toBeInTheDocument();
      expect(screen.getByTestId(/user-id-input/i)).toBeInTheDocument();
      expect(screen.getByTestId(/user-id-input/i)).not.toBeVisible();
      expect(screen.getByTestId(/select-cvs-button/i)).toBeInTheDocument();
      expect(
        screen.getByTestId(/select-department-value/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId(/select-position-value/i)).toBeInTheDocument();
      expect(screen.getByTestId(/employee-radio-item/i)).toBeInTheDocument();
      expect(screen.getByTestId(/admin-radio-item/i)).toBeInTheDocument();
      expect(screen.getByTestId(/cancel-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/submit-button/i)).toBeInTheDocument();
    });
  });

  test("should render default user values correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/open-dialog/i));

    await vi.waitFor(() => {
      expect(screen.getByText(userMock.department_name)).toBeInTheDocument();
      expect(screen.getByText(userMock.position_name)).toBeInTheDocument();
      expect(screen.getByTestId(/employee-radio-item/i)).toBeChecked();
      expect(screen.getByTestId(/admin-radio-item/i)).not.toBeChecked();
    });
  });
});
