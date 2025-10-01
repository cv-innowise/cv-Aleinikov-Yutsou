import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@/shared/lib/queries/mocks/get-profile.mock";
import "@/shared/lib/queries/mocks/get-languages.mock";
import "../mocks/add-profile-language.mock";
import "../mocks/delete-profile-languages.mock";
import "../mocks/update-profile-language.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { UserLanguages } from "..";
import {
  adminUserMock,
  userMock as authUserMock,
  getAuthUserMock,
} from "@/shared/lib/queries/mocks/get-auth-user.mock";
import { getProfileMock, profileMock } from "@/shared/lib/queries/mocks/get-profile.mock";
import { renderServerComponent } from "@/shared/lib/render-server-side";

vi.mock("");

describe("UserLanguages (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await UserLanguages({ userId: "1" });
    return renderServerComponent(jsx);
  };

  test("should render user profile correctly for this user", async () => {
    await renderComponent();

    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(
      screen.getByText(profileMock.languages[0].proficiency)
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileMock.languages[0].proficiency)
    ).not.toBeDisabled();
    expect(
      screen.getByText(profileMock.languages[1].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileMock.languages[1].name)
    ).not.toBeDisabled();
    expect(screen.getByText(/add new language.../i)).toBeInTheDocument();
    expect(screen.getByText(/delete languages/i)).toBeInTheDocument();
  });

  test("should render user profile correctly for another user", async () => {
    getAuthUserMock.mockImplementationOnce(() => ({
      ...authUserMock,
      id: "1234",
    }));
    await renderComponent();

    expect(screen.getByText(/languages/i)).toBeInTheDocument();
    expect(
      screen.getByText(profileMock.languages[0].proficiency)
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileMock.languages[0].proficiency)
    ).toBeDisabled();
    expect(
      screen.getByText(profileMock.languages[1].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileMock.languages[1].name)
    ).toBeDisabled();
    expect(screen.queryByText(/add new language.../i)).toBeNull();
    expect(screen.queryByText(/delete languages/i)).toBeNull();
  });

  test("should render user profile correctly for admin", async () => {
    getAuthUserMock.mockImplementationOnce(() => adminUserMock);
    await renderComponent();

    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(
      screen.getByText(profileMock.languages[0].proficiency)
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileMock.languages[0].proficiency)
    ).not.toBeDisabled();
    expect(screen.getByText(profileMock.languages[1].name)).toBeInTheDocument();
    expect(screen.getByText(profileMock.languages[1].name)).not.toBeDisabled();
    expect(screen.getByText(/add new language.../i)).toBeInTheDocument();
    expect(screen.getByText(/delete languages/i)).toBeInTheDocument();
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
