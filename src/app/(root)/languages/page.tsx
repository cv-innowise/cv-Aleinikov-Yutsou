import { LanguagesList } from "@/widgets/languages-list";
import { Suspense } from "react";

export const metadata = {
  title: "Languages List",
  description: "Browse and manage languages.",
  keywords: ["languages", "CV Platform"],
};

const LanguagesPage = () => {
  return (
    <Suspense fallback={<LanguagesList.Skeleton />}>
      <LanguagesList />
    </Suspense>
  );
};

export default LanguagesPage;
