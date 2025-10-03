import "@/features/position-form/mocks/use-get-position.mock";
import "@/features/position-form/mocks/create-position.mock";
import "@/features/position-form/mocks/update-position.mock";
import "@/features/positions-columns/mocks/delete-position.mock";
import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@/shared/lib/queries/mocks/get-positions.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { PositionsList } from "..";
import { userEvent } from "@vitest/browser/context";
import {
  adminUserMock,
  userMock,
  getAuthUserMock
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import { positionsMock } from "@/shared/lib/queries/mocks/get-positions.mock";

vi.mock("");

describe("PositionsList (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await PositionsList({});
    return render(jsx);
  };

  test("should render positions list correctly",async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    await renderComponent();

    expect(screen.getByText(/positions/i)).toBeInTheDocument();
    expect(screen.getByText(positionsMock[0].name)).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)).toHaveLength(
      positionsMock.length
    );
  });

  test("should show dropdown menu after action button click", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      const updatePosition = screen.getByTestId(/update-position-button/i);
      expect(updatePosition).toBeInTheDocument();
      expect(updatePosition).toBeDisabled();

      const deletePosition = screen.getByTestId(/delete-position-button/i);
      expect(deletePosition).toBeInTheDocument();
      expect(deletePosition).toBeDisabled();
    });
  });

  test("should show dropdown menu after action button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      expect(screen.getByTestId(/update-position-button/i)).not.toBeDisabled();
      expect(screen.getByTestId(/delete-position-button/i)).not.toBeDisabled();
    });
  });

  test("should show create position dialog after update position button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/create-position-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/create position/i)).toHaveLength(2);
    });
  });

  test("should show update position dialog after update position button click for admin", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);
    await user.click(screen.getByTestId(/update-position-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/update position/i)).toHaveLength(2);
    });
  });
});
