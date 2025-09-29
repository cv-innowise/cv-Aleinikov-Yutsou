import { vi } from "vitest";

const deletePositionMock = vi.fn();
vi.mock("../mutations/use-delete-position", () => ({
  useDeletePosition: () => ({
    deletePosition: deletePositionMock,
    position: {},
    loading: false,
    error: null,
  })
}));

export { deletePositionMock };
