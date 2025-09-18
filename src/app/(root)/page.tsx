"use client";

import { logout } from "@/features/auth/model/auth-service";
import { Button } from "@/shared/components/ui/button";
import { getSession } from "@/shared/lib/cookies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

const GET_USER_BY_ID = gql`
  query GetUserById {
    user(userId: 736) {
      id
      created_at
      email
      is_verified
      profile {
        avatar
      }
    }
  }
`;

export default function Home() {
  const [getUserInfo, { loading, error, data }] = useLazyQuery(GET_USER_BY_ID, {});
  const router = useRouter();
  useEffect(() => {
    console.log(getSession());
  });

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <div>
      <div>
        <Button onClick={handleLogout}>logout</Button>
        <Button onClick={() => getUserInfo()}>get user</Button>
      </div>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data && <pre style={{ marginTop: 12 }}>{JSON.stringify(data.user, null, 2)}</pre>}
    </div>
  );
}
