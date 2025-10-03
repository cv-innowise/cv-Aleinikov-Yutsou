import "../mocks/use-get-position.mock";
import "../mocks/create-position.mock";
import "../mocks/update-position.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { PositionForm } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { Position } from "@/shared/graphql/positions/positions.types";
import { positionMock } from "../mocks/use-get-position.mock";

vi.mock("");

describe("PositionForm (integration)", () => {
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

  test("Should render create form correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/create position/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/position name/i)).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });

  test("Should render update form correctly", async () => {
    const user = userEvent.setup();
    renderComponent("2");

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/update position/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/position name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/position name/i)).toHaveValue(
        positionMock.name
      );
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });
});
