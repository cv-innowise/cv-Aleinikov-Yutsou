import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { SignupForm } from "../ui/signup-form";

const hoisted = vi.hoisted(() => ({
  signupUserMock: vi.fn(),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

vi.mock("../lib/use-signup", () => ({
  useSignup: () => ({ signupUser: hoisted.signupUserMock, loading: false, error: undefined }),
}));

beforeEach(() => {
  hoisted.signupUserMock.mockReset();
  cleanup();
});

describe("SignupForm (unit)", () => {
  it("submits valid registration data via signupUser", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "new@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "123456");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => expect(hoisted.signupUserMock).toHaveBeenCalledWith({ email: "new@mail.com", password: "123456" }, expect.anything()));
  });

  it("shows validation errors and does not call signupUser on invalid form", async () => {
    render(<SignupForm />);

    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();

    expect(hoisted.signupUserMock).not.toHaveBeenCalled();
  });

  it("shows 'Invalid email format' for incorrect email", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "not-an-email");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
    expect(hoisted.signupUserMock).not.toHaveBeenCalled();
  });

  it("requires password to include at least 1 digit", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abcdef");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText("Password must include at least 1 digit")).toBeInTheDocument();
    expect(hoisted.signupUserMock).not.toHaveBeenCalled();
  });

  it("forbids spaces in password", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc 123");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText("Password must not contain spaces")).toBeInTheDocument();
    expect(hoisted.signupUserMock).not.toHaveBeenCalled();
  });

  it("forbids password containing the email", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");

    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123user@example.com");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText("Password must not contain your email")).toBeInTheDocument();
    expect(hoisted.signupUserMock).not.toHaveBeenCalled();
  });
});
