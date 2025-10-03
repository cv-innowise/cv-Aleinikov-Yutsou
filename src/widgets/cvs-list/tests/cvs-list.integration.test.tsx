import "../mocks/get-cvs.mock";
import "@/features/cvs-columns/mocks/delete-cv.mock"
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

vi.mock("");

describe("CvsList (integration)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async () => {
    const jsx = await CvsList({});
    return render(jsx);
  };

  test("should render cvs list correctly", async () => {
    await renderComponent();

    expect(screen.getByText(/cvs/i)).toBeInTheDocument();
    expect(screen.getByText(cvsMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(cvsMock[0].description)).toBeInTheDocument();
    expect(screen.getByText(cvsMock[0].user.email)).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(/action-button/i)).toHaveLength(
      cvsMock.length
    );
  });

  test("should show dropdown menu after action button click", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);

    await vi.waitFor(() => {
      expect(screen.getByTestId(/cv-link/i)).toBeInTheDocument();
      expect(screen.getByTestId(/update-cv-button/i)).toBeInTheDocument();
      expect(screen.getByTestId(/delete-cv-button/i)).toBeInTheDocument();
    });
  });

  test("should show create cv dialog after update cv button click", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getByTestId(/create-cv-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/create cv/i)).toHaveLength(2);
    });
  });

  test("should show update cv dialog after update cv button click", async () => {
    const user = userEvent.setup();
    await renderComponent();

    await user.click(screen.getAllByTestId(/action-button/i)[0]);
    await user.click(screen.getByTestId(/update-cv-button/i));

    await vi.waitFor(() => {
      expect(screen.getAllByText(/update cv/i)).toHaveLength(2);
    });
  });
});
