import { vi } from "vitest";

export const updateCvMock = vi.fn(async () => Promise.resolve());

export const resetUpdateCvMock = () => {
  updateCvMock.mockClear();
};
