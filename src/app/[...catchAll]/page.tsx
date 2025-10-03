import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { redirect } from "next/navigation";

export default async function CatchAll() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }
  redirect(`/users/${user.id}/profile`);
}
