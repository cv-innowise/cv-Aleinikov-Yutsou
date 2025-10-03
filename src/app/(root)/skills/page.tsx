import { SkillsList } from "@/widgets/skills-list";
import { Suspense } from "react";

const SkillsPage = () => {
  return (
    <Suspense fallback={<SkillsList.Skeleton/>}>
      <SkillsList />
    </Suspense>
  );
};

export default SkillsPage;
