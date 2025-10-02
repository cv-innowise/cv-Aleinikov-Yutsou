import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@/shared/lib/queries/mocks/get-profile.mock";
import "@/shared/lib/queries/mocks/get-skills.mock";
import "@/shared/lib/queries/mocks/get-skill-categories.mock";
import "../mocks/add-profile-skill.mock";
import "../mocks/delete-profile-skills.mock";
import "../mocks/update-profile-skill.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { UserSkills } from "..";
import {
  adminUserMock,
  userMock as authUserMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import {
  getProfileMock,
  profileMock,
} from "@/shared/lib/queries/mocks/get-profile.mock";
import { renderServerComponent } from "@/shared/lib/render-server-side";

vi.mock("");

describe("UserSkills (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await UserSkills({ userId: "1" });
    return renderServerComponent(jsx);
  };

  test("should render user profile correctly for this user", async () => {
    await renderComponent();

    await vi.waitFor(() => {
      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("Frontend technologies")).toBeInTheDocument();
      expect(screen.getByText(profileMock.skills[0].name)).toBeInTheDocument();
      expect(
        screen.getByText("State management libraries")
      ).toBeInTheDocument();
      expect(screen.getByText(/add new skill.../i)).toBeInTheDocument();
      expect(screen.getByText(/delete skills/i)).toBeInTheDocument();
    });
  });

  test("should render user profile correctly for another user", async () => {
    getAuthUserMock.mockImplementationOnce(() => ({
      ...authUserMock,
      id: "1234",
    }));
    await renderComponent();

    expect(screen.getByText(/skills/i)).toBeInTheDocument();
    expect(screen.getByText("Frontend technologies")).toBeInTheDocument();
    expect(screen.getByText(profileMock.skills[0].name)).toBeDisabled();
    expect(screen.getByText("State management libraries")).toBeInTheDocument();
    expect(screen.queryByText(/add new skill.../i)).toBeNull();
    expect(screen.queryByText(/delete skills/i)).toBeNull();
  });

  test("should render user profile correctly for admin", async () => {
    getAuthUserMock.mockImplementationOnce(() => adminUserMock);
    await renderComponent();

    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Frontend technologies")).toBeInTheDocument();
    expect(screen.getByText(profileMock.skills[0].name)).toBeInTheDocument();
    expect(screen.getByText("State management libraries")).toBeInTheDocument();
    expect(screen.getByText(/add new skill.../i)).toBeInTheDocument();
    expect(screen.getByText(/delete skills/i)).toBeInTheDocument();
  });

  test("should show not found messag, if user doesn't exist", async () => {
    getProfileMock.mockImplementationOnce(() => undefined);
    await renderComponent();

    expect(screen.getByText(/sorry, user not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/maybe you've ment to see your profile?/i)
    ).toBeInTheDocument();
  });
});
