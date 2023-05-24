/*import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../../packages/db/prisma/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;
      
      if (typeof query !== "string"){
        throw new Error("invalid request");
      }

      //search posts
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              body: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      res.status(200).json({ posts: [] });
    } catch (error) {}
  }
}
// nuo cia naujas kodas
import { PrismaClient } from "@prisma/client";

import { trpc } from "@trpc/server";

const prisma = new PrismaClient();

type SearchArgs = {
  query: string;
};

const appRouter = trpc.router();

appRouter.query("search", {
  input: trpc.shape({
    query: trpc.string(),
  }),
  async resolve({ input }: trpc.ResolveContext<SearchArgs>) {
    const results = await prisma.user.findMany({
      where: {
        name: {
          contains: input.query,
        },
      },
    });
    return results;
  },
});

export default appRouter;
*/
