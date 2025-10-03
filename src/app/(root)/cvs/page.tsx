import { CvsList } from "@/widgets/cvs-list";
import { Suspense } from "react";

const CvsPage = () => {
  return (
    <Suspense fallback={<CvsList.Skeleton />}>
      <CvsList />
    </Suspense>
  );
};

export default CvsPage;
