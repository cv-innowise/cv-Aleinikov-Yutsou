import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginMock } from "../mocks/login.mocks";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { LoginForm } from "../ui/login-form";
import { userEvent } from "@vitest/browser/context";
import { MockedProvider } from "@apollo/client/testing/react";
import { clearCookies, getCookie } from "../mocks/cookies.mocks";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

vi.mock("next/headers", () => ({
  __esModule: true,
  headers: () => new Headers(),
  cookies: () => ({
    get: () => undefined,
    getAll: () => [],
    set: () => {},
    delete: () => {},
  }),
  draftMode: () => ({ isEnabled: false }),
}));

beforeEach(() => {
  clearCookies();
});

function renderLoginForm() {
  return render(
    <MockedProvider mocks={[loginMock]}>
      <LoginForm />
    </MockedProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  cleanup();
});

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    renderLoginForm();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
  it("shows validation errors for empty fields", async () => {
    renderLoginForm();
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();
  });

  it("logs in with correct credentials", async () => {
    renderLoginForm();
    await userEvent.type(screen.getByPlaceholderText("Email"), "test@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "passworD123");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(getCookie("access_token")).toBe("mock_access_token");
      expect(getCookie("refresh_token")).toBe("mock_refresh_token");
    });
  });
});
