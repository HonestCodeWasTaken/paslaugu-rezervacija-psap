import { z } from "zod";
import { prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const advertisementRouter = router({
  createAdvertisement: protectedProcedure
    .input(z.object({ image_url: z.string() }))
    .mutation(async ({ input }) => {
      const advertisement = await prisma.advertisement.create({ data: input });
      return advertisement;
    }),

  getAdvertisement: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const advertisement = await prisma.advertisement.findUnique({
        where: { id: input.id },
      });
      return advertisement;
    }),

  updateAdvertisement: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        image_url: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const advertisement = await prisma.advertisement.update({
        where: { id: input.id },
        data: input,
      });
      return advertisement;
    }),

  deleteAdvertisement: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const advertisement = await prisma.advertisement.delete({
        where: { id: input.id },
      });
      return advertisement;
    }),
});
