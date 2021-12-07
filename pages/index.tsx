import React from "react";
import { useQuery } from "@apollo/client";
import { LIST_USERS_WITH_PAGINATION } from "queries/github";
import DefaultLayout from "components/Layouts/DefaultLayout";
import Panel from "components/shared/Panel/Panel";
import Link from "next/link";
import Input from "components/shared/Input/Input";
import { Button } from "components/shared/Button/Button";
import SkeletonLoader from "components/shared/SkeletonLoader/SkeletonLoader";

export default function Home() {
  const [userSearch, setUserSearch] = React.useState("");
  const { loading, error, data } = useQuery(LIST_USERS_WITH_PAGINATION, {
    variables: {
      query: userSearch,
    },
  });

  return (
    <DefaultLayout>
      <div className="flex px-2 gap-x-3 py-10 max-w-[700px] mx-auto">
        <Input
          onChange={(e) => setUserSearch(e.target.value)}
          value={userSearch}
          className="w-full h-12"
          placeholder="Search github users"
        />
        <Button>Search</Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {loading &&
          [...new Array(10)].map(() => (
            <Panel>
              <SkeletonLoader
                status={loading ? "loading" : "success"}
                error={error}
                repeat={5}
                type="line"
              ></SkeletonLoader>
            </Panel>
          ))}
        {data?.search.edges.map((user: any) => {
          return (
            <Link
              href={`/${user.node.login}/repositories`}
              key={user.node.login}
            >
              <a className="max-w-[300px] cursor-pointer grid focus:ring-br-primary focus:ring-2  focus:outline-none rounded-sm focus:ring-offset-4 ">
                <Panel className="overflow-hidden">
                  <div className="flex items-center">
                    <img
                      src={user.node.avatarUrl}
                      alt="user avatar"
                      className="w-full"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xl font-medium">{user.node.login}</p>
                  </div>
                </Panel>
              </a>
            </Link>
          );
        })}
      </div>
      {data?.search.edges.length === 0 && (
        <div className="text-center text-lg font-medium">No users found</div>
      )}
    </DefaultLayout>
  );
}
