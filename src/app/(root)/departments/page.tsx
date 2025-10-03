import { DepartmentsList } from "@/widgets/departments-list";
import { Suspense } from "react";

const DepartmentsPage = () => {
  return (
    <Suspense fallback={<DepartmentsList.Skeleton />}>
      <DepartmentsList />
    </Suspense>
  );
};

export default DepartmentsPage;
