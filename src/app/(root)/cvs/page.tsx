import { CvsList } from "@/widgets/cvs-list";
import { Suspense } from "react";

export const metadata = {
  title: "CVs List",
  description: "Browse and manage employee CVs, skills, and project experience.",
  keywords: ["CV", "resume", "skills", "projects", "employees", "HR"],
};

const CvsPage = () => {
  return (
    <Suspense fallback={<CvsList.Skeleton />}>
      <CvsList />
    </Suspense>
  );
};

export default CvsPage;
