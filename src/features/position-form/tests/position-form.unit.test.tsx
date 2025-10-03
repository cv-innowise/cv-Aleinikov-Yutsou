import "../mocks/use-get-position.mock";
import "../mocks/create-position.mock";
import "../mocks/update-position.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { PositionForm } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { createPositionMock } from "../mocks/create-position.mock";
import { updatePositionMock } from "../mocks/update-position.mock";
import { Position } from "@/shared/graphql/positions/positions.types";

vi.mock("");

describe("PositionForm (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (positionId?: Position["id"]) => {
    render(
      <Dialog>
        <DialogTrigger data-testid="open-dialog">Open</DialogTrigger>
        <PositionForm positionId={positionId} />
      </Dialog>
    );
  };

  test("Should submit form to create position correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.type(
      screen.getByPlaceholderText(/position name/i),
      "positionName"
    );
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(createPositionMock).toHaveBeenCalledWith({
        name: "positionName",
      });
    });
  });

  test("Should submit form to update position correctly", async () => {
    const user = userEvent.setup();
    renderComponent("2");

    await user.click(screen.getByText(/open/i));
    await user.clear(screen.getByPlaceholderText(/position name/i));
    await user.type(
      screen.getByPlaceholderText(/position name/i),
      "positionName"
    );
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(updatePositionMock).toHaveBeenCalledWith({
        positionId: "2",
        name: "positionName",
      });
    });
  });

  test("Should show form errors correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/position name/i), "1");

    await vi.waitFor(() => {
      expect(
        screen.getByText("Name must be at least 4 characters")
      ).toBeInTheDocument();
    });
  });
});
