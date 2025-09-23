import { Sidebar, SidebarContent, SidebarFooter } from "@/shared/components/ui/sidebar";
import { NavMenu } from "./nav-menu";
import { links } from "../model/links";
import { getSessionServerSide } from "@/shared/lib/cookies";
import { getClient } from "@/shared/lib/apollo/apollo-client";
import { UserPopover } from "@/features/user-popover";
import { gql } from "@apollo/client";
import { User } from "cv-graphql";

interface UserResponse {
  user: User;
}

export const Navbar = async () => {
  const session = await getSessionServerSide();

  const { data } = await getClient().query<UserResponse>({
    query: gql`
      query QetUserById($userId: ID!) {
        user(userId: $userId) {
          id
          email
          profile {
            avatar
            full_name
          }
        }
      }
    `,
    variables: { userId: session?.id },
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-11">
        <NavMenu links={links} />
      </SidebarContent>
      <SidebarFooter>
        <UserPopover user={data?.user} />
      </SidebarFooter>
    </Sidebar>
  );
};
