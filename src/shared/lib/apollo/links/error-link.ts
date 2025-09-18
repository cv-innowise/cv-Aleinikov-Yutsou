import { logout } from "@/features/auth/model/auth-service";
import { CombinedGraphQLErrors } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

export const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach((err) => {
      if (err.message === "Unauthorized") {
        logout();
        window.location.replace("/login");
      } else {
        console.error(`[GraphQL error]: Message: ${err.message}`);
      }
    });
  }
});
