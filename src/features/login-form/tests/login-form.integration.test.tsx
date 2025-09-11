import React from "react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { loginMock } from "../mocks/login.mocks";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { LoginForm } from "../ui/login-form";
import { userEvent } from "@vitest/browser/context";
import { MockedProvider } from "@apollo/client/testing/react";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

function renderLoginForm() {
  return render(
    <MockedProvider mocks={[loginMock]}>
      <LoginForm />
    </MockedProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
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
    // Current schema returns min length error for empty password
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();
  });

  it("logs in with correct credentials", async () => {
    renderLoginForm();
    await userEvent.type(screen.getByPlaceholderText("Email"), "test@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "123456");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(localStorage.getItem("access_token")).toBe("mock_access_token");
      expect(localStorage.getItem("refresh_token")).toBe("mock_refresh_token");
    });
  });
});
