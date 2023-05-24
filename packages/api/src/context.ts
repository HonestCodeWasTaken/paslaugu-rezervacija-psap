import { NextApiRequest, NextApiResponse } from "next";
import { S3Client } from "@aws-sdk/client-s3";
import { type inferAsyncReturnType } from "@trpc/server";
// eslint-disable-next-line import/no-extraneous-dependencies
import { type Session } from "next-auth";
import { getServerSession } from "@acme/auth";
import { prisma } from "@acme/db";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 * */
export const createContextInner = async (opts: CreateContextOptions) => {
  return {};
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 * */
export const createContext = async (opts: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const { req, res } = opts;
  const session = await getServerSession(opts);
  const s3 = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_IAM_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY!,
    },
  });
  return {
    req,
    res,
    session,
    prisma,
    s3,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
