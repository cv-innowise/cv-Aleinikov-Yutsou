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

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();

    expect(signupUserMock).not.toHaveBeenCalled();
  });
});
