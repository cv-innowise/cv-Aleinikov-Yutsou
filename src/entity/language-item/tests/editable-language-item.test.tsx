import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { LanguageItem } from "../ui/language-item";
import { languagesMock } from "../mocks/languages.mock";
import { onChangeMock } from "../mocks/language-item.mock";
import { userEvent } from "@vitest/browser/context";
import { LanguageItemProps } from "../types";
import { Proficiency } from "@/shared/types/language";

describe("EditableSkillItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props?: Partial<LanguageItemProps>) => {
    const defaultProps: LanguageItemProps = {
      name: "Russian",
      proficiency: Proficiency.Native,
      languages: languagesMock,
      isEditable: true,
      isDisabled: false,
      onChange: onChangeMock,
    };
    return render(<LanguageItem {...defaultProps} {...props} />);
  };

  test("should render language item correctly", () => {
    renderComponent();

    expect(screen.getByText(/russian/i)).toBeInTheDocument();
    expect(screen.getByTestId(/language-button/i)).toBeInTheDocument();
    expect(screen.getByText(/native/i)).toBeInTheDocument();
    expect(screen.getByTestId(/proficiency-button/i)).toBeInTheDocument();
  });

  test("buttons should be disabled if isDisabled", () => {
    renderComponent({ isDisabled: true });

    expect(screen.getByTestId(/language-button/i)).toBeDisabled();
    expect(screen.getByTestId(/proficiency-button/i)).toBeDisabled();
  });

  test("should show popup when language clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/language-button/i));

    expect(
      screen.getByPlaceholderText(/search language.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(languagesMock[0])).toBeInTheDocument();
  });

  test("should render add version, if no language and proficiency provided", () => {
    renderComponent({
      name: undefined,
      proficiency: undefined,
    });

    expect(screen.getByTestId(/language-button/i)).toHaveTextContent(
      /add new language.../i
    );
    expect(screen.getByText(/a1/i)).toBeInTheDocument();
  });

  test("should handle language pick correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/language-button/i));
    await user.click(screen.getByText(/german/i));

    await vi.waitFor(() => {
      expect(screen.getByTestId(/language-button/i)).toHaveTextContent(
        /german/i
      );
      expect(onChangeMock).toBeCalledWith({
        name: "German",
      });
      expect(screen.queryByPlaceholderText(/search language.../i)).toBeNull();
    });
  });

  test("should not trigger onChange when same language picked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/language-button/i));
    await user.click(screen.getAllByText(/russian/i).at(-1)!);

    await vi.waitFor(() => {
      expect(screen.getByTestId(/language-button/i)).toHaveTextContent(
        /russian/i
      );
      expect(onChangeMock).not.toBeCalled();
      expect(screen.queryByPlaceholderText(/search language.../i)).toBeNull();
    });
  });

  test("should handle proficiency pick correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/proficiency-button/i));
    await user.click(screen.getByText(/b2/i));

    await vi.waitFor(() => {
      expect(screen.getByTestId(/proficiency-button/i)).toHaveTextContent(
        /b2/i
      );
      expect(onChangeMock).toBeCalledWith({
        proficiency: "B2",
      });
    });
  });

  test("should not trigger onChange when same proficiency picked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/proficiency-button/i));
    await user.click(screen.getAllByText(/native/i).at(-1)!);

    await vi.waitFor(() => {
      expect(screen.getByTestId(/proficiency-button/i)).toHaveTextContent(
        /native/i
      );
      expect(onChangeMock).not.toBeCalled();
    });
  });

  test("should handle search language correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/language-button/i));
    await user.type(screen.getByPlaceholderText(/search language.../i), "germ");

    expect(screen.getByText(/german/i)).toBeInTheDocument();
    expect(screen.getAllByText(/russian/i)).length(1);
  });
});
