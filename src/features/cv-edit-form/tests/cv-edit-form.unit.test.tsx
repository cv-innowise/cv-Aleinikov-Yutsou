import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@testing-library/jest-dom/vitest";

import { render, screen, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { resetUpdateCvMock, updateCvMock } from "../mocks/update-cv.mock";
import { makeCv } from "../mocks/make-cv.mock";

vi.mock("@/features/cv-form/mutations/update-cv", () => ({
  updateCv: updateCvMock,
}));

import { CvEditForm } from "../ui/cv-edit-form";
import { userEvent } from "@vitest/browser/context";

function renderComponent() {
  return render(
    <MockedProvider>
      <CvEditForm cv={makeCv()} />
    </MockedProvider>
  );
}

beforeEach(() => {
  cleanup();
  resetUpdateCvMock();
});

describe("CvEditForm (integration)", () => {
  it("Should show validation errors correctly", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.clear(screen.getByPlaceholderText(/name/i));
    await user.clear(screen.getByPlaceholderText(/education/i));
    await user.clear(screen.getByPlaceholderText(/description/i));

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText(/name must be at least 4 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/description is required/i)).toBeInTheDocument();
  });
});
