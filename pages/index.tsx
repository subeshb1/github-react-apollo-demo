import React from "react";
import { useQuery } from "@apollo/client";
import { LIST_USERS_WITH_PAGINATION } from "queries/github";
import DefaultLayout from "components/Layouts/DefaultLayout";

export default function Home() {
  const [userSearch, setUserSearch] = React.useState("");
  const { loading, error, data } = useQuery(LIST_USERS_WITH_PAGINATION, {
    variables: {
      query: userSearch,
    },
  });
  console.log(data?.search.edges);

  return (
    <DefaultLayout>
      <div></div>

      {data?.search.edges.map((user: any) => {
        return (
          <div>
            <img src={user.node.avatarUrl} alt="user avatar" />
            <p>{user.node.login}</p>
          </div>
        );
      })}
    </DefaultLayout>
  );
}
