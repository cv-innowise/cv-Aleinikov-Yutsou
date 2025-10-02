import "../mocks/delete-avatar.mock";
import "../mocks/upload-avatar.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ProfileAvatar } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { uploadAvatarMock } from "../mocks/upload-avatar.mock";
import { deleteAvatarMock } from "../mocks/delete-avatar.mock";
import { avatarMock, fileMock } from "../mocks/profile-avatar.mock";

vi.mock("");

describe("ProfileAvatar (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <ProfileAvatar
        userId={"1"}
        avatarUrl={"avatarUrl.png"}
        email={"email@mail.com"}
        isEditable={true}
      />
    );
  };

  test("Should upload avatar correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.upload(screen.getByTestId("upload-avatar"), avatarMock);

    await vi.waitFor(() => {
      expect(uploadAvatarMock).toHaveBeenCalled();
    });
  });

  test("Should delete avatar correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId("delete-avatar"));

    await vi.waitFor(() => {
      expect(deleteAvatarMock).toHaveBeenCalledWith({
        userId: "1"
      })
    })
  });

  test("Should not upload avatar if incorrect type", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.upload(screen.getByTestId("upload-avatar"), fileMock);

    await vi.waitFor(() => {
      expect(uploadAvatarMock).not.toHaveBeenCalled();
    });
  });
});
