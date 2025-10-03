import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/shared/components/ui/sidebar";
import { NavMenu } from "./nav-menu";
import { UserPopover } from "@/features/user-popover";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";
import { User } from "@/shared/types/cv-graphql";

export const Navbar = async () => {
  const user = await getAuthUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-11">
        <NavMenu />
      </SidebarContent>
      <SidebarFooter>
        <UserPopover user={user as User} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
