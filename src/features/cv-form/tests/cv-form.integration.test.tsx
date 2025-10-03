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
import { Cv } from "@/shared/graphql/cvs/cvs.types";
import { cvMock } from "../mocks/use-get-cv.mock";

vi.mock("");

describe("CvForm (integration)", () => {
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

  test("Should render create form correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/create cv/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/cv name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/education/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/cv description/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });

  test("Should render update form correctly", async () => {
    const user = userEvent.setup();
    renderComponent("1");

    await user.click(screen.getByText(/open/i));

    await vi.waitFor(() => {
      expect(screen.getByText(/update cv/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/cv name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/cv name/i)).toHaveValue(cvMock.name);
      expect(screen.getByPlaceholderText(/education/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/education/i)).toHaveValue(
        cvMock.education
      );
      expect(
        screen.getByPlaceholderText(/cv description/i)
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/cv description/i)).toHaveValue(
        cvMock.description
      );
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });
});
