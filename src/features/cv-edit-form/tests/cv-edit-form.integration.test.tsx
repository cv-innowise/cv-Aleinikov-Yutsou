import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { resetUpdateCvMock, updateCvMock } from "../mocks/update-cv.mock";
import { makeCv } from "../mocks/make-cv.mock";
import { userEvent } from "@vitest/browser/context";

vi.mock("@/features/cv-form/mutations/update-cv", () => ({
  updateCv: updateCvMock,
}));

import { CvEditForm } from "../ui/cv-edit-form";
import { updateCv } from "@/features/cv-form/mutations/update-cv";

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
  it("should render correctly", () => {
    renderComponent();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/education/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("MIT")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Senior engineer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("Should submit form with updated values", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.clear(screen.getByPlaceholderText(/name/i));
    await user.type(screen.getByPlaceholderText(/name/i), "Jane Smith");
    await user.clear(screen.getByPlaceholderText(/education/i));
    await user.type(screen.getByPlaceholderText(/education/i), "Harvard");
    await user.clear(screen.getByPlaceholderText(/description/i));
    await user.type(screen.getByPlaceholderText(/description/i), "Lead Developer");

    await user.click(screen.getByRole("button", { name: /save changes/i }));
    await waitFor(() => {
      expect(updateCv).toHaveBeenCalledTimes(1);
      expect(updateCv).toHaveBeenCalledWith({
        cvId: "1",
        name: "Jane Smith",
        education: "Harvard",
        description: "Lead Developer",
      });
    });
  });
});
