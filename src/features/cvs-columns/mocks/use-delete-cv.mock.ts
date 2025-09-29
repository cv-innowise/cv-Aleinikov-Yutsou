import { vi } from "vitest";

const deleteCvMock = vi.fn();
vi.mock("../mutations/use-delete-cv", () => ({
  useDeleteCv: () => ({
    deleteCv: deleteCvMock,
    cv: {},
    loading: false,
    error: null,
  })
}));

export { deleteCvMock };
