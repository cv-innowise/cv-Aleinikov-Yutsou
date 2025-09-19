import { vi } from "vitest";

vi.mock("next/headers", () => ({
  __esModule: true,
  headers: () => new Headers(),
  cookies: () => ({
    get: () => undefined,
    getAll: () => [],
    set: () => {},
    delete: () => {},
  }),
  draftMode: () => ({ isEnabled: false }),
}));
