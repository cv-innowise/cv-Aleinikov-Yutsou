import { UsersList } from "@/widgets/users-list";
import { Suspense } from "react";

const UsersPage = () => {
  return (
    <Suspense fallback={<UsersList.Skeleton />}>
      <UsersList />
    </Suspense>
  );
};

export default UsersPage;
