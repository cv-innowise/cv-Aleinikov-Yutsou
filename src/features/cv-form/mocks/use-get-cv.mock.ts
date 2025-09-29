import { Cv } from "@/shared/graphql/cvs/cvs.types";
import { vi } from "vitest";

const { cvMock, useGetCvMock } = vi.hoisted(() => ({
  cvMock: {
    id: "1",
    name: "cvName",
    education: "cvEducation",
    description: "cvDescription",
  },
  useGetCvMock: (cvId?: Cv["id"]) => {
    if (!cvId) {
      return;
    }

    return cvMock;
  },
}));
vi.mock("../queries/use-get-cv", () => ({
  useGetCv: useGetCvMock,
}));

export { cvMock, useGetCvMock };