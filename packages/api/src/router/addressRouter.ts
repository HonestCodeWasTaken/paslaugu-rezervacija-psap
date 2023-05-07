import { z } from "zod";
import { prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const addressRouter = router({
  createAddress: protectedProcedure
    .input(
      z.object({
        country: z.string(),
        city: z.string(),
        street_name: z.string(),
        street_number: z.number(),
        postal_code: z.string(),
        coordinates: z.string().optional(),
        business_id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const address = await prisma.address.create({
        data: {
          country: input.country,
          city: input.city,
          street_name: input.street_name,
          street_number: input.street_number,
          postal_code: input.postal_code,
          coordinates: input.coordinates,
          business_id: input.business_id,
        },
      });
      return address;
    }),

  updateAddress: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        updates: z.object({
          country: z.string().optional(),
          city: z.string().optional(),
          street_name: z.string().optional(),
          street_number: z.number().optional(),
          postal_code: z.string().optional(),
          coordinates: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const address = await prisma.address.update({
        where: { id: input.id },
        data: input.updates,
      });
      return address;
    }),

  deleteAddress: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const address = await prisma.address.delete({ where: { id: input.id } });
      return address;
    }),

  getAddressById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const address = await prisma.address.findUnique({
        where: { id: input.id },
      });
      return address;
    }),

  getAddressesByBusinessId: publicProcedure
    .input(z.object({ business_id: z.number() }))
    .query(async ({ input }) => {
      const addresses = await prisma.address.findMany({
        where: { business_id: input.business_id },
        orderBy: { id: "asc" },
      });
      return addresses;
    }),
});
