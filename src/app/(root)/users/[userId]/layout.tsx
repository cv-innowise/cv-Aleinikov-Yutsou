import { UserNav } from "@/widgets/user-nav/";

interface UserLayoutProps {
  params: Promise<{ userId: string }>;
}

const UserLayout: React.FC<React.PropsWithChildren<UserLayoutProps>> = async ({
  params,
  children,
}) => {
  const { userId } = await params;

  return (
    <div className="w-full h-full space-y-8">
      <UserNav userId={userId} />
      <div className="w-full h-full flex justify-center items-center">{children}</div>
    </div>
  );
};

export default UserLayout;
