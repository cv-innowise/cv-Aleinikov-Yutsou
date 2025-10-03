import { vi } from "vitest";

const { getProfileMock, profileMock } = vi.hoisted(() => ({
  profileMock: {
    id: "760",
    created_at: "1757939935461",
    first_name: "tests",
    last_name: "test",
    full_name: "tests test",
    avatar: "image.png",
    skills: [
      {
        name: "React",
        categoryId: "3",
        mastery: "Competent",
      },
      {
        name: "Redux",
        categoryId: "4",
        mastery: "Proficient",
      },
      {
        name: "RxJS",
        categoryId: "4",
        mastery: "Competent",
      },
    ],
    languages: [
      {
        name: "Italian",
        proficiency: "B1",
      },
      {
        name: "English",
        proficiency: "B2",
      },
    ],
  },
  getProfileMock: vi.fn().mockImplementation(() => profileMock),
}));
vi.mock("@/shared/lib/queries/get-profile", () => ({
  getProfile: getProfileMock,
}));

export { profileMock, getProfileMock };