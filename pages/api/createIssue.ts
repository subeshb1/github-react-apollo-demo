import client from "lib/apolloClient";
import { NextApiRequest, NextApiResponse } from "next";
import { CREATE_ISSUES } from "queries/github";

export default async function createIssue(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await client.mutate({
        mutation: CREATE_ISSUES,
        variables: {
          id: req.body.id,
          title: req.body.title,
          body: req.body.body,
        },
        context: {
          headers: {
            Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          },
        },
      });
      return res.status(200).json({ message: "Issue created" });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  return res.status(404).json({ message: "Not Found" });
}
