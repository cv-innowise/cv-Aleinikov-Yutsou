import { screen, waitFor } from "@testing-library/react";
import { render } from "vitest-browser-react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { DataTable } from "../ui/data-table";
import { userEvent } from "@vitest/browser/context";
import { dataMock } from "../mocks/data.mock";
import { columnsMock } from "../mocks/columns.mock";

describe("EditableSkillItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <DataTable data={dataMock} columns={columnsMock} searchColumn={"email"} />
    );
  };

  test("should render skill item correctly", () => {
    renderComponent();

    expect(screen.getByTestId(/search/i)).toBeInTheDocument();
    expect(screen.getByTestId(/sort-email/i)).toBeInTheDocument();
    expect(screen.getByText(/department/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/head-ceil/i).at(-1)).toBeEmptyDOMElement();
    expect(screen.getByText(/position/i)).toBeInTheDocument();
    expect(screen.getByText(dataMock[0].email)).toBeInTheDocument();
    expect(screen.getAllByText(dataMock[0].position)[0]).toBeInTheDocument();
    expect(screen.getAllByText(dataMock[0].department)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId(/table-row/i)).toHaveLength(20);
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/no-results/i)).toBeNull();
  });

  test("should show 20 more items on scroll", async () => {
    renderComponent();

    screen.getByTestId(/loading/i).scrollIntoView();

    await waitFor(() => {
      expect(screen.getAllByTestId(/table-row/i)).toHaveLength(40);
      expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
      expect(screen.queryByText(/no-results/i)).toBeNull();
    });
  });

  test("should show all items on scroll till end", async () => {
    renderComponent();

    screen.getByTestId(/loading/i).scrollIntoView();

    await waitFor(() => {
      expect(screen.getAllByTestId(/table-row/i)).toHaveLength(40);
      expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
      expect(screen.queryByText(/no-results/i)).toBeNull();
    });

    screen.getByTestId(/loading/i).scrollIntoView();

    await waitFor(() => {
      expect(screen.getAllByTestId(/table-row/i)).toHaveLength(dataMock.length);
      expect(screen.getByTestId(/no-results/i)).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).toBeNull();
    });
  });

  test("should select input work correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByTestId(/search/i), dataMock[4].email);

    expect(screen.getAllByTestId(/table-row/i)).toHaveLength(1);
    expect(screen.getByText(dataMock[4].email)).toBeInTheDocument();
  });

    test("should render empty list correctly", async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.type(screen.getByTestId(/search/i), "@@@");

      expect(screen.queryAllByTestId(/table-row/i)).toHaveLength(0);
      expect(screen.getByTestId(/no-results/i)).toBeInTheDocument();
    });

  test("should sorting work correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByTestId(/sort-email/i));

    expect(screen.getAllByText(/@/i)[0]).toHaveTextContent("a@a.aaAA");

    await user.click(screen.getByTestId(/sort-email/i));

    expect(screen.getAllByText(/@/i)[0]).toHaveTextContent(
      "1111111111@gmail.com"
    );
  });
});
