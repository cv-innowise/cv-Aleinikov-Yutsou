import { type LucideIcon, Users, TrendingUp, FileUser, Languages } from "lucide-react";

export type linkItem = {
  title: string;
  url: string;
  icon?: string;
};

export const links: linkItem[] = [
  {
    title: "Employees",
    url: "/users",
    icon: "Users",
  },
  {
    title: "Skills",
    url: "/skills",
    icon: "TrendingUp",
  },
  {
    title: "Languages",
    url: "/languages",
    icon: "Languages",
  },
  {
    title: "CVs",
    url: "/cvs",
    icon: "FileUser",
  },
];
