import type { Cv } from "@/shared/graphql/cvs/cvs.types";

export const makeCv = (overrides: Partial<Cv> = {}): Cv =>
  ({
    id: "1",
    name: "John Doe",
    education: "MIT",
    description: "Senior engineer",
    ...overrides,
  } as Cv);
