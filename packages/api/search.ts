import type { NextApiRequest, NextApiResponse } from "next";

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
