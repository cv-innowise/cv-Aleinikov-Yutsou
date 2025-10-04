import { getSessionServerSide } from "@/shared/lib/cookies";
import { redirect } from "next/navigation";

export default async function CatchAll() {
  const session = await getSessionServerSide();

  if (!session || !session.id) {
    redirect("/login");
  }
  redirect(`/users/${session.id}/profile`);
}
