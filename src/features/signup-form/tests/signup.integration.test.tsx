import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { MockedProvider } from "@apollo/client/testing/react";
import { signupMock } from "../mocks/signup.mocks";
import { SignupForm } from "../ui/signup-form";
import { clearCookies, getCookie } from "../mocks/cookies.mocks";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

beforeEach(() => {
  clearCookies();
});

describe("SignupForm (integration)", () => {
  it("creates account and stores tokens", async () => {
    render(
      <MockedProvider mocks={[signupMock]}>
        <SignupForm />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText("Email"), "new@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "passworD123");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(getCookie("access_token")).toBe("mock_access_token");
      expect(getCookie("refresh_token")).toBe("mock_refresh_token");
    });
  });
});
