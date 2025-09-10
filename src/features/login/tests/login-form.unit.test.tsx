import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { LoginForm } from "../ui/login-form";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: any) => <a {...props} />,
}));

const loginUserMock = vi.fn();
vi.mock("../lib/useLogin", () => ({
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

    await waitFor(() => expect(loginUserMock).toHaveBeenCalledTimes(1));

    const payload = loginUserMock.mock.calls[0][0];
    expect(payload).toEqual({ email: "tosogif653@evoxury.com", password: "dGtImvQhQI0yPi" });
  });

  it("does not call loginUser on invalid form and shows validation errors", async () => {
    render(<LoginForm />);

    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();

    expect(loginUserMock).not.toHaveBeenCalled();
  });
});
