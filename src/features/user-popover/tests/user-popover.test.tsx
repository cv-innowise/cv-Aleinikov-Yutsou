import { describe, it, vi, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";
import { UserPopover } from "@/features/user-popover";
import { mockUser, mockUserWithoutAvatar } from "@/features/user-popover/mocks/user";

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a {...props} />,
}));

vi.mock("@/shared/components/ui/sidebar", () => {
  type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
  const SidebarMenuButton = ({ children, ...props }: React.PropsWithChildren<ButtonProps>) => (
    <button type="button" {...props}>
      {children}
    </button>
  );
  return { SidebarMenuButton };
});

vi.mock("@/shared/lib/cookies", () => ({
  clearTokens: vi.fn(),
  removeSession: vi.fn(),
}));

import { clearTokens, removeSession } from "@/shared/lib/cookies";

afterEach(() => {
  vi.resetAllMocks();
  cleanup();
});

describe("UserPopover", () => {
  it("should render user popover correctly", () => {
    render(<UserPopover user={mockUser} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
  it("should render user popover with avatar fallback when avatar is missing", () => {
    render(<UserPopover user={mockUserWithoutAvatar} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("J")).toBeInTheDocument();
  });
  it("opens popover and shows menu items", async () => {
    render(<UserPopover user={mockUser} />);
    const triggerButton = screen.getByRole("button", { name: /John Doe/i });

    await userEvent.click(triggerButton);
    expect(screen.getByRole("link", { name: /Profile/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Settings/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();
  });
  it("calls logout function on logout button click", async () => {
    render(<UserPopover user={mockUser} />);
    const triggerButton = screen.getByRole("button", { name: /John Doe/i });
    await userEvent.click(triggerButton);

    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();

    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    await userEvent.click(logoutButton);

    expect(clearTokens).toHaveBeenCalled();
    expect(removeSession).toHaveBeenCalled();
  });
});
