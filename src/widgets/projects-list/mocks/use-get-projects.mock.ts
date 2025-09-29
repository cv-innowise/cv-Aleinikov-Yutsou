import { vi } from "vitest";

const projectsMock = [
  {
    id: "1",
    name: "Virtual Tours",
    internal_name: "🇮🇹 ReqE-MatterportProject-IT/1А4",
    domain: "AR (Augmented Reality)",
    start_date: "2019-02-27",
    end_date: "2023-11-13",
  },
  {
    id: "31",
    name: "Freelancing Platform",
    internal_name: "",
    domain: "Business application",
    start_date: "2020-06-28",
    end_date: "2021-06-28",
  },
  {
    id: "30",
    name: "Course Manager",
    internal_name: "",
    domain: "Education",
    start_date: "2021-06-28",
    end_date: "2022-07-29",
  },
  {
    id: "4",
    name: "While Label Marketplace",
    internal_name: "🇺🇸 MarketplaceProject-US/YZ0",
    domain: "Blockchain",
    start_date: "2021-01-01",
    end_date: "2022-07-19",
  },
];
vi.mock("../queries/use-get-projects.ts", () => ({ getProjects: () => projectsMock }));

export { projectsMock };
