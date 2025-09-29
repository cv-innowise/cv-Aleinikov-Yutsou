import "../mocks/get-cvs.mock";
import "@/features/cvs-columns/mocks/delete-cv.mock";
import "@/shared/lib/queries/mocks/get-auth-user.mock";
import "@/features/cv-form/mocks/use-get-cv.mock";
import "@/features/cv-form/mocks/create-cv.mock";
import "@/features/cv-form/mocks/update-cv.mock";
import { cvsMock } from "../mocks/get-cvs.mock";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { CvsList } from "..";
import { userEvent } from "@vitest/browser/context";
import { deleteCvMock } from "@/features/cvs-columns/mocks/delete-cv.mock";

vi.mock("");

describe("CvsList (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await CvsList({});
    return render(jsx);
  };

  test("should search cvs by name", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.type(screen.getByPlaceholderText(/search/i), cvsMock[0].name);

    await vi.waitFor(() => {
      expect(screen.getByText(cvsMock[0].name)).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should search cvs by description", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.type(
      screen.getByPlaceholderText(/search/i),
      cvsMock[0].description
    );

    await vi.waitFor(() => {
      expect(screen.getByText(cvsMock[0].description)).toBeInTheDocument();
      expect(screen.getAllByTestId(/action-button/i)).toHaveLength(1);
    });
  });

  test("should sort cvs correctly", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByText(/description/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/cv-description/i)[0]).toHaveTextContent(
        "SomeText1"
      );
    });

    await user.click(screen.getByText(/description/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/cv-description/i)[0]).toHaveTextContent(
        "SomeText3"
      );
    });

    await user.click(screen.getByText(/description/i));

    await vi.waitFor(() => {
      expect(screen.getAllByTestId(/cv-description/i)[0]).toHaveTextContent(
        cvsMock[0].description
      );
    });
  });

  test("should delete cv correctly", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-cv-button/i));
    await user.click(screen.getByTestId(/alert-dialog-confirm/i));

    await vi.waitFor(() => {
      expect(deleteCvMock).toHaveBeenCalledWith({
        cvId: cvsMock[1].id,
      });
    });
  });

  test("should not delete cv on cancel", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[1]);
    await user.click(screen.getByTestId(/delete-cv-button/i));
    await user.click(screen.getByTestId(/alert-dialog-close/i));

    await vi.waitFor(() => {
      expect(deleteCvMock).not.toHaveBeenCalled();
    });
  });
});
