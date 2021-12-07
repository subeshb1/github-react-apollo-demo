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
import { LIST_REPOSITORY_ISSUES } from "queries/github";
import React, { ReactElement } from "react";

export default function Repository(): ReactElement {
  const router = useRouter();
  const [repoSearch, setRepoSearch] = React.useState("");
  const userId = router.query.userId as string;
  const repoName = router.query.repository as string;
  const { loading, data } = useQuery(LIST_REPOSITORY_ISSUES, {
    variables: {
      owner: userId,
      name: repoName,
    },
  });
  console.log(data?.repository?.issues?.edges);
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
            to: `/${userId}/repositories`,
          },
          {
            name: repoName,
          },
        ]}
      ></BreadCrumbs>
      <div className="flex justify-between gap-x-3 my-10">
        <h1 className="text-3xl font-medium ">{repoName}</h1>
        <div>
          <Button className="">Create Issue</Button>
        </div>
      </div>
      <Panel>
        <SkeletonLoader repeat={5} status={loading ? "loading" : "success"}>
          {data?.repository?.issues?.edges && (
            <Table
              insidePanel
              columns={[
                {
                  Header: "Title",
                  accessor: "title",
                },
                {
                  Header: "Author",
                  accessor: "author",
                },
              ]}
              data={data?.repository?.issues?.edges
                .map((repo: { node: unknown }) => repo.node)

                .map((repo: any) => ({
                  ...repo,
                  author: `Created by ${repo.author.login} on ${new Date(
                    repo.createdAt
                  ).toLocaleDateString()}`,
                }))}
            />
          )}
        </SkeletonLoader>
      </Panel>
    </DefaultLayout>
  );
}
