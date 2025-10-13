import { GET_CV } from "@/shared/graphql/cvs/cvs.queries";
import { CvRequest, CvResponse } from "@/shared/graphql/cvs/cvs.types";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { CvNav } from "@/widgets/cv-nav";
import { Metadata } from "next";

interface CvLayoutProps {
  params: Promise<{ cvId: string }>;
}

export async function generateMetadata({
  params,
}: CvLayoutProps): Promise<Metadata> {
  const { cvId } = await params;
  const { data } = await getClient().query<CvResponse, CvRequest>({
    query: GET_CV,
    variables: { cvId },
  });

  if (!data) {
    return {
      title: "CV Not Found",
      description: "The requested user does not exist.",
      keywords: ["cv", "not found", "CV Platform"],
    };
  }

  return {
    title: `CV of ${data.cv.user?.profile.full_name || data.cv.user?.email}`,
    description: `CV of ${
      data.cv.user?.profile.full_name || data.cv.user?.email
    }, showcasing skills and projects.`,
    keywords: ["cv", "skills", "projects", "CV Platform"],
  };
}

const CvLayout: React.FC<React.PropsWithChildren<CvLayoutProps>> = async ({
  params,
  children,
}) => {
  const { cvId } = await params;

  return (
    <div className="w-full h-full space-y-8">
      <CvNav cvId={cvId} />
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default CvLayout;
