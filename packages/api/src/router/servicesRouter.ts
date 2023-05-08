import { z } from "zod";
import { prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const serviceRouter = router({
  createServiceBySession: protectedProcedure
    .input(
      z.object({
        service_name: z.string(),
        description: z.string(),
        cost: z.number(),
        session_length: z.string(),
        category_id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Get the current user from the session
      const user = ctx.session?.user;

      // If there's no user in the session, throw an error
      if (!user) {
        throw new Error("User not found in session");
      }

      // Find the business associated with the user
      const business = await prisma.business.findFirst({
        where: { user_id: user.id },
      });

      // If there's no business for the user, throw an error
      if (!business) {
        throw new Error("User has no business");
      }

      // Create a service for the user's business
      const service = await prisma.service.create({
        data: {
          service_name: input.service_name,
          description: input.description,
          cost: input.cost,
          session_length: input.session_length,
          business_id: business.id,
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
  getServicesByUserSession: publicProcedure.query(async ({ ctx }) => {
    // Get the current user from the session
    const user = ctx.session?.user;

    // If there's no user in the session, return an empty array
    if (!user) {
      return [];
    }

    // Find the business associated with the user
    const business = await prisma.business.findFirst({
      where: { user_id: user.id },
    });

    // If there's no business for the user, return an empty array
    if (!business) {
      return [];
    }

    // Get all services for the user's business
    const services = await prisma.service.findMany({
      where: { business_id: business.id },
      orderBy: { id: "asc" },
    });

    return services;
  }),
});
