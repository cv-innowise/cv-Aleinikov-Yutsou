import { type LucideIcon, Users, TrendingUp, FileUser, Languages } from "lucide-react";

type LinkItem = {
  titleKey: string;
  url: string;
  icon?: LucideIcon;
};

export const links: LinkItem[] = [
  {
    titleKey: "users",
    url: "/users",
    icon: Users,
  },
  {
    titleKey: "skills",
    url: "/skills",
    icon: TrendingUp,
  },
  {
    titleKey: "languages",
    url: "/languages",
    icon: Languages,
  },
  {
    titleKey: "cvs",
    url: "/cvs",
    icon: FileUser,
  },
];
