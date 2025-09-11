import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { LoginForm } from "../ui/login-form";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

const loginUserMock = vi.fn();
vi.mock("../lib/use-login", () => ({
  useLogin: () => ({ loginUser: loginUserMock, loading: false, error: undefined }),
}));

beforeEach(() => {
  loginUserMock.mockReset();
});

afterEach(() => {
  cleanup();
});

describe("LoginForm (unit)", () => {
  it("submits valid credentials via loginUser", async () => {
    render(<LoginForm />);

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    await userEvent.type(email, "tosogif653@evoxury.com");
    await userEvent.type(password, "dGtImvQhQI0yPi");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() =>
      expect(loginUserMock).toHaveBeenCalledWith(
        {
          email: "tosogif653@evoxury.com",
          password: "dGtImvQhQI0yPi",
        },
        expect.anything()
      )
    );
  });

  it("does not call loginUser on invalid form and shows validation errors", async () => {
    render(<LoginForm />);

    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    // Updated schema messages
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();

    expect(loginUserMock).not.toHaveBeenCalled();
  });

  it("shows 'Invalid email format' for incorrect email", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "not-an-email");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
    expect(loginUserMock).not.toHaveBeenCalled();
  });

  it("requires password to include at least 1 digit", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abcdef");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Password must include at least 1 digit")).toBeInTheDocument();
    expect(loginUserMock).not.toHaveBeenCalled();
  });

  it("forbids spaces in password", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc 123");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Password must not contain spaces")).toBeInTheDocument();
    expect(loginUserMock).not.toHaveBeenCalled();
  });

  it("forbids password containing the email", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "abc123user@example.com");
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Password must not contain your email")).toBeInTheDocument();
    expect(loginUserMock).not.toHaveBeenCalled();
  });
});
