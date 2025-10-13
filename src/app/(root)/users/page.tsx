import { UsersList } from "@/widgets/users-list";
import { Suspense } from "react";

export const metadata = {
  title: "Users List",
  description: "Browse and manage platform users, view profiles and roles.",
  keywords: ["users", "profiles", "roles", "employees", "HR"],
};

const UsersPage = () => {
  return (
    <Suspense fallback={<UsersList.Skeleton />}>
      <UsersList />
    </Suspense>
  );
};

export default UsersPage;
