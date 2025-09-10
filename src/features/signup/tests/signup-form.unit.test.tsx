import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { SignupForm } from "../ui/signup-form";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: any) => <a {...props} />,
}));

const signupUserMock = vi.fn();
vi.mock("../lib/useSignup", () => ({
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

    await waitFor(() => expect(signupUserMock).toHaveBeenCalledTimes(1));

    const payload = signupUserMock.mock.calls[0][0];
    expect(payload).toEqual({ email: "new@mail.com", password: "123456" });
  });

  it("shows validation errors and does not call signupUser on invalid form", async () => {
    render(<SignupForm />);

    await userEvent.click(screen.getByRole("button", { name: /create accoutn/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();

    expect(signupUserMock).not.toHaveBeenCalled();
  });
});
