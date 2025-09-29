import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "../mocks/use-get-cv.mock";
import "../mocks/create-cv.mock";
import "../mocks/update-cv.mock";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { CvForm } from "..";
import { screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { createCvMock } from "../mocks/create-cv.mock";
import { updateCvMock } from "../mocks/update-cv.mock";
import { Cv } from "@/shared/graphql/cvs/cvs.types";

vi.mock("");

describe("CvForm (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (cvId?: Cv["id"]) => {
    render(
      <Dialog>
        <DialogTrigger data-testid="open-dialog">Open</DialogTrigger>
        <CvForm cvId={cvId} />
      </Dialog>
    );
  };

  test("Should submit form to create cv correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.type(screen.getByPlaceholderText(/cv name/i), "newName");
    await user.type(screen.getByPlaceholderText(/education/i), "newEducation");
    await user.type(
      screen.getByPlaceholderText(/cv description/i),
      "newDescription"
    );
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(createCvMock).toHaveBeenCalledWith({
        userId: "1",
        name: "newName",
        education: "newEducation",
        description: "newDescription",
      });
    });
  });

  test("Should submit form to update cv correctly", async () => {
    const user = userEvent.setup();
    renderComponent("1");

    await user.click(screen.getByText(/open/i));
    const name = screen.getByPlaceholderText(/CV name/i);
    const education = screen.getByPlaceholderText(/Education/i);
    const description = screen.getByPlaceholderText(/CV description/i);
    await user.clear(name);
    await user.type(name, "newName");
    await user.clear(education);
    await user.type(education, "newEducation");
    await user.clear(description);
    await user.type(description, "newDescription");
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(updateCvMock).toHaveBeenCalledWith({
        cvId: "1",
        name: "newName",
        education: "newEducation",
        description: "newDescription",
      });
    });
  });

  test("Should show form errors correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/cv name/i), "1");
    await user.type(screen.getByPlaceholderText(/education/i), "1");
    await user.click(screen.getByText(/confirm/i));

    await vi.waitFor(() => {
      expect(
        screen.getByText("Name must be at least 4 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Education must be at least 4 characters")
      ).toBeInTheDocument();
    });
  });
});
