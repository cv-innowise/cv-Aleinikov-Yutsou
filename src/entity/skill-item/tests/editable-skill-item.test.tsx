import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { SkillItem } from "../ui/skill-item";
import { skillsByCategoriesMock } from "../mocks/skills-by-categories.mock";
import { onChangeMock } from "../mocks/skill-item.mock";
import { userEvent } from "@vitest/browser/context";
import { SkillItemProps } from "../types";
import { Mastery } from "@/shared/types/cv-graphql";

describe("EditableSkillItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props?: Partial<SkillItemProps>) => {
    const defaultProps: SkillItemProps = {
      name: "TypeScript",
      mastery: Mastery.Expert,
      skillsByCategories: skillsByCategoriesMock,
      isEditable: true,
      isDisabled: false,
      onChange: onChangeMock,
    };
    return render(<SkillItem {...defaultProps} {...props} />);
  };

  test("should render skill item correctly", () => {
    renderComponent();

    expect(screen.getByText(/typescript/i)).toBeInTheDocument();
    expect(screen.getByTestId(/slider/i)).toBeInTheDocument();
    expect(screen.getByText(/expert/i)).toBeInTheDocument();
  });

  test("buttons should be disabled if isDisabled", () => {
    renderComponent({ isDisabled: true });

    expect(screen.getByText(/typescript/i)).toBeDisabled();
    expect(screen.queryByText(/expert/i)).toBeNull();
  });

  test("should show popup when skill clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/skill-button/i));

    expect(
      screen.getByPlaceholderText(/search skills.../i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(skillsByCategoriesMock["Frontend"][0].name)
    ).toBeInTheDocument();
  });

  test("should render add version, if no skill adn mastery provided", () => {
    renderComponent({
      name: undefined,
      mastery: undefined,
    });

    expect(screen.getByTestId(/skill-button/i)).toHaveTextContent(
      /add new skill.../i
    );
    expect(screen.getByText(/novice/i)).toBeInTheDocument();
  });

  test("should handle skill pick correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/skill-button/i));
    await user.click(
      screen.getByText(skillsByCategoriesMock["Frontend"][0].name)
    );

    await vi.waitFor(() => {
      expect(screen.getByTestId(/skill-button/i)).toHaveTextContent(
        skillsByCategoriesMock["Frontend"][0].name
      );
      expect(onChangeMock).toBeCalledWith({
        "categoryId": skillsByCategoriesMock["Frontend"][0].categoryId,
        name: skillsByCategoriesMock["Frontend"][0].name,
      });
      expect(screen.queryByPlaceholderText(/search skills.../i)).toBeNull();
    });
  });

  test("should not trigger onChange when same skill picked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/skill-button/i));
    await user.click(screen.getAllByText(/typescript/i).at(-1)!);

    await vi.waitFor(() => {
      expect(screen.getByTestId(/skill-button/i)).toHaveTextContent(
        /typescript/i
      );
      expect(onChangeMock).not.toBeCalled();
      expect(screen.queryByPlaceholderText(/search skills.../i)).toBeNull();
    });
  });

  test("should change mastery correctly", async () => {
    const user = userEvent.setup();
    renderComponent();
    expect(screen.getByTestId(/slider/i)).toBeVisible();
    await user.click(screen.getByTestId(/slider/i).firstElementChild!, {
      position: {
        x: 0,
        y: 0,
      },
    });

    expect(onChangeMock).toHaveBeenCalledWith({ mastery: Mastery.Novice });
    expect(screen.getByText(/novice/i)).toBeInTheDocument();
  });

  test("should handle search skills correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/skill-button/i));
    await user.type(screen.getByPlaceholderText(/search skills.../i), "rea");

    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getAllByText(/typescript/i)).length(1);
  });
});
