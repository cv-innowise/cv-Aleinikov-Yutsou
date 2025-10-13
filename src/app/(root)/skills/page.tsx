import { SkillsList } from "@/widgets/skills-list";
import { Suspense } from "react";

export const metadata = {
  title: "Skills List",
  description: "Browse and manage skills.",
  keywords: ["skills", "CV Platform"],
};

const SkillsPage = () => {
  return (
    <Suspense fallback={<SkillsList.Skeleton />}>
      <SkillsList />
    </Suspense>
  );
};

export default SkillsPage;
