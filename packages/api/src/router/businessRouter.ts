/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { z } from "zod";
import { prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const businessRouter = router({
  createBusiness: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        main_image_url: z.string(),
        phoneNumber: z.string().optional(),
        email: z.string().optional(),
        created: z.date().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const newBusiness = await prisma.business.create({
        data: {
          ...input,
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
      });

      return newBusiness;
    }),

  businessesBySession: protectedProcedure.query(async ({ input, ctx }) => {
    const items = await prisma.business.findMany({
      where: {
        user_id: ctx.session.user.id,
      },
      orderBy: {
        id: "desc",
      },
    });

    return items;
  }),
  updateBusiness: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        main_image_url: z.string().optional(),
        phoneNumber: z.string().optional(),
        email: z.string().optional(),
        created: z.date().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedBusiness = await prisma.business.update({
        where: { id: input.id },
        data: { ...input },
      });

      return updatedBusiness;
    }),
  businessById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const business = await prisma.business.findUnique({
        where: { id: input.id },
      });

      return business;
    }),
  deleteBusiness: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const deletedBusiness = await prisma.business.delete({
        where: { id: input.id },
      });

      return deletedBusiness;
    }),
  allBusinesses: publicProcedure.query(async () => {
    const businesses = await prisma.business.findMany();
    return businesses;
  }),
});
