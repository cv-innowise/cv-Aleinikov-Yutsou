"use client";

import { DialogContent } from "@/shared/components/ui/dialog";
import { User } from "@/shared/graphql/users/users.types";
import { useGetUser } from "../queries/use-get-user";
import { useGetFreeCvs } from "../queries/use-get-free-cvs";
import { UpdateUserForm } from "./update-user-form";
import { useGetDepartments } from "@/shared/lib/hooks/use-get-departments";
import { useGetPositions } from "@/shared/lib/hooks/use-get-positions";
import { CreateUserForm } from "./create-user-form";

interface UserFormProps {
  userId?: User["id"];
}

export const UserForm: React.FC<UserFormProps> = ({ userId }) => {
  const user = useGetUser(userId);
  const freeCvs = useGetFreeCvs();
  const departments = useGetDepartments();
  const positions = useGetPositions();

  return (
    <DialogContent>
      {user ? (
        <UpdateUserForm
          user={user}
          freeCvs={freeCvs}
          departments={departments}
          positions={positions}
        />
      ) : (
        <CreateUserForm
          freeCvs={freeCvs}
          departments={departments}
          positions={positions}
        />
      )}
    </DialogContent>
  );
};