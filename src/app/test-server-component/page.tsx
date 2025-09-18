import { getClient } from "@/shared/lib/apollo/apollo-client";
import { gql } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query GetUserById {
    user(userId: 736) {
      id
      email
      is_verified
      profile {
        avatar
      }
    }
  }
`;

export default async function TestServerComponent() {
  const client = getClient();
  try {
    const { data } = await client.query({ query: GET_USER_BY_ID });
    return <pre>{JSON.stringify(data.user, null, 2)}</pre>;
  } catch (e: any) {
    console.error("Server GQL error:", e);
    return (
      <div>
        <h1>Error</h1>
        <pre>{e?.message}</pre>
      </div>
    );
  }
}
