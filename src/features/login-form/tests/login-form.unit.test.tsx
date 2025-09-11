import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { userEvent as userEventCtx } from "@vitest/browser/context";
import { LoginForm } from "../ui/login-form";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

const hoisted = vi.hoisted(() => ({
  loginUserMock: vi.fn(),
}));
vi.mock("../lib/use-login", () => ({
  useLogin: () => ({ loginUser: hoisted.loginUserMock, loading: false, error: undefined }),
}));

let user: ReturnType<typeof userEventCtx.setup>;

beforeEach(() => {
  hoisted.loginUserMock.mockReset();
  cleanup();
  user = userEventCtx.setup();
});

describe("LoginForm (unit)", () => {
  it("submits valid credentials via loginUser", async () => {
    render(<LoginForm />);

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    await user.type(email, "tosogif653@evoxury.com");
    await user.type(password, "dGtImvQhQI0yPi");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() =>
      expect(hoisted.loginUserMock).toHaveBeenCalledWith(
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

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();

    expect(hoisted.loginUserMock).not.toHaveBeenCalled();
  });

  it("shows 'Invalid email format' for incorrect email", async () => {
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("Email"), "not-an-email");
    await user.type(screen.getByPlaceholderText("Password"), "abc123");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
    expect(hoisted.loginUserMock).not.toHaveBeenCalled();
  });

  it("requires password to include at least 1 digit", async () => {
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "abcdef");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Password must include at least 1 digit")).toBeInTheDocument();
    expect(hoisted.loginUserMock).not.toHaveBeenCalled();
  });

  it("forbids spaces in password", async () => {
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "abc 123");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Password must not contain spaces")).toBeInTheDocument();
    expect(hoisted.loginUserMock).not.toHaveBeenCalled();
  });

  it("forbids password containing the email", async () => {
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "abc123user@example.com");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Password must not contain your email")).toBeInTheDocument();
    expect(hoisted.loginUserMock).not.toHaveBeenCalled();
  });
});
