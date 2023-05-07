import { z } from "zod";
import { Rating_Type, prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const ratingRouter = router({
  createRating: protectedProcedure
    .input(
      z.object({
        created: z.date(),
        description: z.string(),
        service_id: z.number(),
        rating_type: z.nativeEnum(Rating_Type),
      }),
    )
    .mutation(async ({ input }) => {
      const rating = await prisma.rating.create({ data: input });
      return rating;
    }),

  getRating: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const rating = await prisma.rating.findUnique({
        where: { id: input.id },
      });
      return rating;
    }),

  updateRating: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        created: z.date().optional(),
        description: z.string().optional(),
        service_id: z.number().optional(),
        rating_type: z.nativeEnum(Rating_Type).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const rating = await prisma.rating.update({
        where: { id: input.id },
        data: input,
      });
      return rating;
    }),

  deleteRating: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const rating = await prisma.rating.delete({
        where: { id: input.id },
      });
      return rating;
    }),
});
