import React from "react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { ForgotPasswordForm } from "../ui/forgot-password-form";
import { userEvent } from "@vitest/browser/context";

const hoisted = vi.hoisted(() => ({
  forgotPasswordMock: vi.fn(),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

vi.mock("../lib/use-forgot-password", () => ({
  useForgotPassword: () => ({ forgotPassword: hoisted.forgotPasswordMock, loading: false }),
}));

beforeEach(() => {
  hoisted.forgotPasswordMock.mockReset();
  cleanup();
});

describe("ForgotPasswordForm (unit)", () => {
  it("submits valid email via forgotPassword", async () => {
    render(<ForgotPasswordForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "new@mail.com");
    await userEvent.click(screen.getByRole("button", { name: /send reset link/i }));

    await waitFor(() => expect(hoisted.forgotPasswordMock).toHaveBeenCalledWith({ variables: { auth: { email: "new@mail.com" } } }));
  });

  it("shows validation error for empty email", async () => {
    render(<ForgotPasswordForm />);

    await userEvent.click(screen.getByRole("button", { name: /send reset link/i }));
    expect(await screen.findByText("Email is required")).toBeInTheDocument();

    expect(hoisted.forgotPasswordMock).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid email format", async () => {
    render(<ForgotPasswordForm />);

    await userEvent.type(screen.getByPlaceholderText("Email"), "not-an-email");
    await userEvent.click(screen.getByRole("button", { name: /send reset link/i }));

    expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
    expect(hoisted.forgotPasswordMock).not.toHaveBeenCalled();
  });
  it("has a cancel link that navigates to /login", async () => {
    render(<ForgotPasswordForm />);
    const cancelLink = screen.getByRole("link", { name: /cancel/i });
    expect(cancelLink).toBeInTheDocument();
    expect(cancelLink).toHaveAttribute("href", "/login");
  });
});
