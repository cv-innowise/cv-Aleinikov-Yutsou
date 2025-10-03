import { LanguagesList } from "@/widgets/languages-list";
import { Suspense } from "react";

const LanguagesPage = () => {
  return (
    <Suspense fallback={<LanguagesList.Skeleton />}>
      <LanguagesList />
    </Suspense>
  );
};

export default LanguagesPage;
