import { PositionsList } from "@/widgets/positions-list";
import { Suspense } from "react";

export const metadata = {
  title: "Positions List",
  description: "Browse and manage positions.",
  keywords: ["positions", "CV Platform"],
};

const PositionsPage = () => {
  return (
    <Suspense fallback={<PositionsList.Skeleton />}>
      <PositionsList />
    </Suspense>
  );
};

export default PositionsPage;
