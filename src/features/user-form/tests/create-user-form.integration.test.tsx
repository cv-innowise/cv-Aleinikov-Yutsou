import "../mocks/use-get-free-cvs.mock"
import "../mocks/use-get-user.mock"
import "../mocks/create-user.mock"
import "../mocks/update-user.mock";
import "@/shared/lib/queries/mocks/get-departments.mock";
import "@/shared/lib/queries/mocks/get-positions.mock";
import { render } from "vitest-browser-react"
import { UserForm } from ".."
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog"
import { beforeEach, describe, vi, test, expect } from "vitest"
import { userEvent } from "@vitest/browser/context"
import { screen } from "@testing-library/react"

vi.mock("");


describe("CreateUserForm (integration)", () => {
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
  }
  

  test("should render create user form correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/open-dialog/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/create user/i)).toBeInTheDocument();
      expect(screen.getByTestId(/user-email-input/i)).toBeInTheDocument();
      expect(screen.getByTestId(/user-password-input/i)).toBeInTheDocument();
      expect(screen.getByTestId(/user-first-name-input/i)).toBeInTheDocument();
      expect(screen.getByTestId(/user-last-name-input/i)).toBeInTheDocument();
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
})