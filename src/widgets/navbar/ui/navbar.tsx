import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/shared/components/ui/sidebar";
import { NavMenu } from "./nav-menu";
import { UserPopover } from "@/features/user-popover";
import { getAuthUser } from "@/shared/lib/queries/get-auth-user";

export const Navbar = async () => {
  const user = await getAuthUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-11">
        <NavMenu />
      </SidebarContent>
      <SidebarFooter>
        <UserPopover user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
