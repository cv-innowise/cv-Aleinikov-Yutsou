import { DepartmentsList } from "@/widgets/departments-list";
import { Suspense } from "react";

export const metadata = {
  title: "Departments List",
  description: "Browse and manage departments.",
  keywords: ["departments", "CV Platform"],
};

const DepartmentsPage = () => {
  return (
    <Suspense fallback={<DepartmentsList.Skeleton />}>
      <DepartmentsList />
    </Suspense>
  );
};

export default DepartmentsPage;
