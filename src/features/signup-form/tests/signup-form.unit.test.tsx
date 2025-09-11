import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { SignupForm } from "../ui/signup-form";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

const signupUserMock = vi.fn();
vi.mock("../lib/use-signup", () => ({
  useSignup: () => ({ signupUser: signupUserMock, loading: false, error: undefined }),
}));

beforeEach(() => {
  signupUserMock.mockReset();
});

afterEach(() => {
  cleanup();
});

describe("SignupForm (unit)", () => {
  it("submits valid registration data via signupUser", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "new@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "123456");
    await userEvent.click(screen.getByRole("button", { name: /create accoutn/i }));

    await waitFor(() => expect(signupUserMock).toHaveBeenCalledWith({ email: "new@mail.com", password: "123456" }, expect.anything()));
  });

  it("shows validation errors and does not call signupUser on invalid form", async () => {
    render(<SignupForm />);

    await userEvent.click(screen.getByRole("button", { name: /create accoutn/i }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();

    expect(signupUserMock).not.toHaveBeenCalled();
  });

  it("shows 'Invalid email format' for incorrect email", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "not-an-email");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123");
    await userEvent.click(screen.getByRole("button", { name: /create accoutn/i }));

    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
    expect(signupUserMock).not.toHaveBeenCalled();
  });

  it("requires password to include at least 1 digit", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abcdef");
    await userEvent.click(screen.getByRole("button", { name: /create accoutn/i }));

    expect(await screen.findByText("Password must include at least 1 digit")).toBeInTheDocument();
    expect(signupUserMock).not.toHaveBeenCalled();
  });

  it("forbids spaces in password", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc 123");
    await userEvent.click(screen.getByRole("button", { name: /create accoutn/i }));

    expect(await screen.findByText("Password must not contain spaces")).toBeInTheDocument();
    expect(signupUserMock).not.toHaveBeenCalled();
  });

  it("forbids password containing the email", async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");

    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123user@example.com");
    await userEvent.click(screen.getByRole("button", { name: /create accoutn/i }));

    expect(await screen.findByText("Password must not contain your email")).toBeInTheDocument();
    expect(signupUserMock).not.toHaveBeenCalled();
  });
});
