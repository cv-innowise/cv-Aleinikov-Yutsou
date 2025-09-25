import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/shared/components/ui/sidebar";
import { NavMenu } from "./nav-menu";
import { getSessionServerSide } from "@/shared/lib/cookies";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { UserPopover } from "@/features/user-popover";
import { UserResponse, USER_BY_ID } from "@/shared/graphql/users";

export const Navbar = async () => {
  const session = await getSessionServerSide();

  const { data } = await getClient().query<UserResponse>({
    query: USER_BY_ID,
    variables: { userId: session?.id },
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-11">
        <NavMenu />
      </SidebarContent>
      <SidebarFooter>
        <UserPopover user={data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
