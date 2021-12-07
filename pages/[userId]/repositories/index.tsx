import { useQuery } from "@apollo/client";
import { EyeIcon, StarIcon } from "@heroicons/react/solid";
import DefaultLayout from "components/Layouts/DefaultLayout";
import BreadCrumbs from "components/shared/Breadcrumbs/Breadcrumbs";
import { Button } from "components/shared/Button/Button";
import Input from "components/shared/Input/Input";
import Panel from "components/shared/Panel/Panel";
import SkeletonLoader from "components/shared/SkeletonLoader/SkeletonLoader";
import Table from "components/shared/Table/Table";
import Link from "next/link";
import { useRouter } from "next/router";
import { SEARCH_USER_REPOSITORIES } from "queries/github";
import React, { ReactElement } from "react";

export default function Repositories(): ReactElement {
  const router = useRouter();
  const [repoSearch, setRepoSearch] = React.useState("");
  const userId = router.query.userId as string;
  const { loading, data } = useQuery(SEARCH_USER_REPOSITORIES, {
    variables: {
      login: userId,
    },
  });
  console.log(data?.user?.repositories.edges);
  return (
    <DefaultLayout>
      <BreadCrumbs
        items={[
          {
            name: "Users",
            to: "/",
          },
          {
            name: userId,
          },
          {
            name: "Repositories",
          },
        ]}
      ></BreadCrumbs>
      <div className="flex px-2 gap-x-3 pt-10 pb-4 max-w-[700px] mx-auto">
        <Input
          onChange={(e) => setRepoSearch(e.target.value)}
          value={repoSearch}
          className="w-full h-12"
          placeholder="Search repositories"
        />
        <Button>Search</Button>
      </div>
      <h1 className="text-3xl font-medium my-10">{userId}</h1>

      <Panel>
        <SkeletonLoader repeat={5} status={loading ? "loading" : "success"}>
          {data?.user?.repositories.edges && (
            <Table
              insidePanel
              disableSortBy
              columns={[
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "Stars",
                  accessor: "stars",
                },
                {
                  Header: "Watchers",
                  accessor: "watchers",
                },
              ]}
              data={data?.user?.repositories.edges
                .map((repo: { node: unknown }) => repo.node)
                .filter((repo: any) =>
                  repo.name.toLowerCase().includes(repoSearch.toLowerCase())
                )
                .map((repo: any) => ({
                  ...repo,
                  name: (
                    <Link href={`/${userId}/repositories/${repo.name}`}>
                      <a className="hover:underline">{repo.name}</a>
                    </Link>
                  ),
                  stars: (
                    <div className="flex gap-2">
                      <StarIcon className="h-5 w-5" />
                      {repo.stargazers.totalCount}{" "}
                    </div>
                  ),
                  watchers: (
                    <div className="flex gap-2">
                      <EyeIcon className="h-5 w-5" />
                      {repo.watchers.totalCount}
                    </div>
                  ),
                }))}
            />
          )}
        </SkeletonLoader>
      </Panel>
    </DefaultLayout>
  );
}
