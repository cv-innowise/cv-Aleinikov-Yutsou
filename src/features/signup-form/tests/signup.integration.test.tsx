import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { MockedProvider } from "@apollo/client/testing/react";
import { signupMock } from "../mocks/signup.mocks";
import { SignupForm } from "../ui/signup-form";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

beforeEach(() => {
  localStorage.clear();
});

describe("SignupForm (integration)", () => {
  it("creates account and stores tokens", async () => {
    render(
      <MockedProvider mocks={[signupMock]}>
        <SignupForm />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText("Email"), "new@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "123456");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(localStorage.getItem("access_token")).toBe("mock_access_token");
      expect(localStorage.getItem("refresh_token")).toBe("mock_refresh_token");
    });
  });
});
