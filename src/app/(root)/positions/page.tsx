import { PositionsList } from "@/widgets/positions-list";
import { Suspense } from "react";

const PositionsPage = () => {
  return (
    <Suspense fallback={<PositionsList.Skeleton />}>
      <PositionsList />
    </Suspense>
  );
};

export default PositionsPage;
