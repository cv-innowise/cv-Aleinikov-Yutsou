import { GET_USER, UserRequest, UserResponse } from "@/shared/graphql/users";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { UserNav } from "@/widgets/user-nav/";
import { Metadata } from "next";

interface UserLayoutProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({
  params,
}: UserLayoutProps): Promise<Metadata> {
  const { userId } = await params;
  const { data } = await getClient().query<UserResponse, UserRequest>({
    query: GET_USER,
    variables: { userId },
  });

  if (!data) {
    return {
      title: "User Not Found",
      description: "The requested user does not exist.",
      keywords: ["user", "not found", "CV Platform"],
    };
  }

  return {
    title: `User ${data.user.profile.full_name || data.user.email}`,
    description: "Profile of the user.",
    keywords: ["user", "profile", "projects", "CV Platform", "employee", "HR"],
  };
}

const UserLayout: React.FC<React.PropsWithChildren<UserLayoutProps>> = async ({
  params,
  children,
}) => {
  const { userId } = await params;

  return (
    <div className="w-full h-full space-y-8">
      <UserNav userId={userId} />
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
