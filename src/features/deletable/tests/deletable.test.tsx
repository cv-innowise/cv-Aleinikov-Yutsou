import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  Deletable,
  DeletableContent,
  DeletableItem,
  DeletableTrigger,
} from "../";
import { ButtonMock, onButtonClickMock } from "../mocks/button.mock";
import { mockItems } from "../mocks/items.mock";
import { onDeleteItemsMock } from "../mocks/deletable.mock";
import { userEvent } from "@vitest/browser/context";

describe("SkillItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <Deletable onDeleteItems={onDeleteItemsMock}>
        <div>
          <DeletableContent className="flex space-x-2">
            {mockItems.map((item) => (
              <DeletableItem key={item.id} id={item.id}>
                <ButtonMock text={item.name} />
              </DeletableItem>
            ))}
          </DeletableContent>
          <DeletableTrigger>
            <div>Delete items</div>
          </DeletableTrigger>
        </div>
      </Deletable>
    );
  };

  test("should render deletable items and buttons correctly", () => {
    renderComponent();

    expect(screen.getByTestId(/start-selection-button/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/cancel-selecting-button/i)).toBeNull();
    expect(screen.queryByTestId(/delete-selected-button/i)).toBeNull();
    expect(screen.getByText(mockItems[0].name)).toBeInTheDocument();
    expect(screen.queryByTestId(/select-button/i)).toBeNull();
    expect(screen.getAllByTestId(/delete-button/i)[0]).toBeInTheDocument();
    expect(screen.queryByTestId(/popover/i)).toBeNull();
  });

  test("should handle items events correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(mockItems[0].name), {
      position: {
        x: 0,
        y: 0,
      },
    });

    expect(onButtonClickMock).toHaveBeenCalled();
  });

  test("should delete multiple items correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/start-selection-button/i));

    expect(screen.queryByTestId(/start-selection-button/i)).toBeNull();
    expect(screen.getByTestId(/cancel-selecting-button/i)).toBeInTheDocument();
    expect(screen.getByTestId(/delete-selected-button/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/delete-button/i)).toBeNull();
    
    
    const selectButtons = screen.getAllByTestId(/select-button/i);
    await user.click(selectButtons[0]);
    await user.click(selectButtons[2]);
    await user.click(selectButtons[3]);
    
    expect(screen.getByText(mockItems[0].name)).toBeDisabled();
    expect(screen.getByText(mockItems[2].name)).toBeDisabled();
    expect(screen.getByText(mockItems[3].name)).toBeDisabled();
    expect(screen.getByTestId(/selected-length/i)).toHaveTextContent("3");

    await user.click(screen.getByTestId(/delete-selected-button/i));

    expect(onDeleteItemsMock).toHaveBeenCalledWith([
      mockItems[0].id,
      mockItems[2].id,
      mockItems[3].id,
    ]);
    expect(screen.getByTestId(/start-selection-button/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/cancel-selecting-button/i)).toBeNull();
    expect(screen.queryByTestId(/delete-selected-button/i)).toBeNull();
    expect(screen.getAllByTestId(/delete-button/i)[0]).toBeInTheDocument();
  });

  test("should unselect items correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/start-selection-button/i));
    const selectButtons = screen.getAllByTestId(/select-button/i);
    await user.click(selectButtons[0]);
    await user.click(selectButtons[2]);
    await user.click(selectButtons[2]);
    expect(screen.getByText(mockItems[0].name)).toBeDisabled();
    expect(screen.getByText(mockItems[2].name)).not.toBeDisabled();
  });

  test("should cancel selection correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/start-selection-button/i));
    const selectButtons = screen.getAllByTestId(/select-button/i);
    await user.click(selectButtons[0]);
    await user.click(selectButtons[2]);
    await user.click(selectButtons[3]);
    await user.click(screen.getByTestId(/cancel-selecting-button/i));

    expect(onDeleteItemsMock).not.toHaveBeenCalled();
    expect(screen.getByTestId(/start-selection-button/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/cancel-selecting-button/i)).toBeNull();
    expect(screen.queryByTestId(/delete-selected-button/i)).toBeNull();
    expect(screen.getAllByTestId(/delete-button/i)[0]).toBeInTheDocument();
  });

  test("should  delete one item correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getAllByTestId(/delete-button/i)[0]);

    expect(screen.getByTestId(/popover/i)).toBeInTheDocument();

    await user.click(screen.getByTestId(/confirm-deleting-button/i));

    vi.waitFor(() => {
      expect(screen.queryByTestId(/popover/i)).toBeNull();
      expect(onDeleteItemsMock).toBeCalledWith([mockItems[0].id]);
    });
  });

  test("should cancel deleting item correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getAllByTestId(/delete-button/i)[0]);

    expect(screen.getByTestId(/popover/i)).toBeInTheDocument();

    await user.click(screen.getByTestId(/confirm-deleting-button/i));

    vi.waitFor(() => {
      expect(screen.queryByTestId(/popover/i)).toBeNull();
      expect(onDeleteItemsMock).toBeCalledWith([mockItems[0].id]);
    });
  });
});
