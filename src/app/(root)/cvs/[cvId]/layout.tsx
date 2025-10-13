import { CvNav } from "@/widgets/cv-nav";

interface CvLayoutProps {
  params: Promise<{ cvId: string }>;
}

const CvLayout: React.FC<React.PropsWithChildren<CvLayoutProps>> = async ({ params, children }) => {
  const { cvId } = await params;

  return (
    <div className="w-full h-full space-y-8">
      <CvNav cvId={cvId} />
      <div className="w-full h-full flex justify-center items-center">{children}</div>
    </div>
  );
};

export default CvLayout;
