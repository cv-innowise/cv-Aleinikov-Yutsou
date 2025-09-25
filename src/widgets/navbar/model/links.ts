import { type LucideIcon, Users, TrendingUp, FileUser, Languages } from "lucide-react";

type LinkItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

export const links: LinkItem[] = [
  {
    title: "Employees",
    url: "/users",
    icon: Users,
  },
  {
    title: "Skills",
    url: "/skills",
    icon: TrendingUp,
  },
  {
    title: "Languages",
    url: "/languages",
    icon: Languages,
  },
  {
    title: "CVs",
    url: "/cvs",
    icon: FileUser,
  },
];
