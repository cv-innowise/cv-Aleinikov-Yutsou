import "../mocks/upload-avatar.mock";
import "../mocks/delete-avatar.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ProfileAvatar } from "..";
import { screen } from "@testing-library/react";

vi.mock("");

describe("ProfileAvatar (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (
    isEditable: boolean = true,
    avatarUrl: string | null = "avatarUrl.png"
  ) => {
    render(
      <ProfileAvatar
        userId={"1"}
        avatarUrl={avatarUrl}
        email={"email@mail.com"}
        isEditable={isEditable}
      />
    );
  };

  test("Should render avatar correctly in not editable mode", () => {
    renderComponent(false);

    expect(screen.queryByTestId(/delete-avatar/i)).toBeNull();
    expect(screen.queryByTestId(/upload-avatar/i)).toBeNull();
  });

  test("Should render avatar correctly in editable mode", () => {
    renderComponent();

    expect(screen.getByTestId(/delete-avatar/i)).toBeInTheDocument();
    expect(screen.getByTestId(/upload-avatar/i)).toBeInTheDocument();
  });

  test("Should not show delete button if no avatar provided", () => {
    renderComponent(true, null);

    expect(screen.queryByTestId(/delete-avatar/i)).toBeNull();
  });
});
