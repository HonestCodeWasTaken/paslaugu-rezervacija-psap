import { z } from "zod";
import { prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const serviceRouter = router({
  createService: protectedProcedure
    .input(
      z.object({
        service_name: z.string(),
        description: z.string(),
        cost: z.number(),
        session_length: z.string(),
        business_id: z.number(),
        category_id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const service = await prisma.service.create({
        data: {
          service_name: input.service_name,
          description: input.description,
          cost: input.cost,
          session_length: input.session_length,
          business_id: input.business_id,
          category_id: input.category_id,
        },
      });
      return service;
    }),

  updateService: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        updates: z.object({
          service_name: z.string().optional(),
          description: z.string().optional(),
          cost: z.number().optional(),
          session_length: z.string().optional(),
          category_id: z.number().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const service = await prisma.service.update({
        where: { id: input.id },
        data: input.updates,
      });
      return service;
    }),

  deleteService: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const service = await prisma.service.delete({ where: { id: input.id } });
      return service;
    }),

  getServiceById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const service = await prisma.service.findUnique({
        where: { id: input.id },
      });
      return service;
    }),

  getServicesByBusinessId: publicProcedure
    .input(z.object({ business_id: z.number() }))
    .query(async ({ input }) => {
      const services = await prisma.service.findMany({
        where: { business_id: input.business_id },
        orderBy: { id: "asc" },
      });
      return services;
    }),
});
