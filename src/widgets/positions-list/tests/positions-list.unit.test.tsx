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
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import { positionsMock } from "@/shared/lib/queries/mocks/get-positions.mock";
import { deletePositionMock } from "@/features/positions-columns/mocks/delete-position.mock";

vi.mock("");

describe("PositionsList (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await PositionsList({});
    return render(jsx);
  };

  test("should search positions by name", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.type(
      screen.getByPlaceholderText(/search/i),
      positionsMock[0].name
    );

    await vi.waitFor(() => {
      expect(screen.getByText(positionsMock[0].name)).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should sort positions correctly", async () => {
    getAuthUserMock.mockImplementation(() => userMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText(/name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/name/i)[0]).toHaveTextContent(
        "Data Analyst"
      );
    });

    await user.click(screen.getByText(/name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/name/i)[0]).toHaveTextContent(
        "UX Designer"
      );
    });

    await user.click(screen.getByText(/name/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/name/i)[0]).toHaveTextContent(
        positionsMock[0].name
      );
    });
  });

  test("should delete positions correctly", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-position-button/i));
    await user.click(screen.getByTestId(/alert-dialog-confirm/i));

    await vi.waitFor(() => {
      expect(deletePositionMock).toHaveBeenCalledWith({
        positionId: positionsMock[1].id,
      });
    });
  });

  test("should not delete project on cancel", async () => {
    getAuthUserMock.mockImplementation(() => adminUserMock);
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-position-button/i));
    await user.click(screen.getByTestId(/alert-dialog-close/i));

    await vi.waitFor(() => {
      expect(deletePositionMock).not.toHaveBeenCalled();
    });
  });
});
