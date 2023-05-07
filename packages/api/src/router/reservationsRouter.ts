import { z } from "zod";
import { Notification_Type, ReservationStatus, prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";
import "./notificationsRouter";

export const reservationRouter = router({
  createReservation: protectedProcedure
    .input(
      z.object({
        status: z.nativeEnum(ReservationStatus),
        date: z.string(),
        reservationEndDate: z.string(),
        description: z.string().optional(),
        time: z.string(),
        userId: z.string(),
        businessId: z.number(),
        serviceId: z.number(),
        colorTag: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const reservation = await prisma.reservation.create({
        data: {
          status: input.status,
          date: input.date,
          reservationEndDate: input.reservationEndDate,
          description: input.description,
          time: input.time,
          userId: input.userId,
          businessId: input.businessId,
          serviceId: input.serviceId,
          colorTag: input.colorTag,
          created: new Date(),
        },
      });
      //TODO: Add notification
      // await notificationRouter.call('createNotification', {
      //   userId: reservation.userId,
      //   isRead: false,
      //   message: 'A new reservation has been created.',
      //   type: Notification_Type.RESERVATION_UPDATE,
      //   timestamp: new Date().toISOString(),
      // });
      return reservation;
    }),

  updateReservation: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        updates: z.object({
          status: z.nativeEnum(ReservationStatus).optional(),
          date: z.string().optional(),
          reservationEndDate: z.string().optional(),
          description: z.string().optional(),
          time: z.string().optional(),
          userId: z.string().optional(),
          businessId: z.number().optional(),
          serviceId: z.number().optional(),
          colorTag: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const reservation = await prisma.reservation.update({
        where: { id: input.id },
        data: {
          ...input.updates,
          modified: new Date(),
        },
      });
      return reservation;
    }),

  deleteReservation: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const reservation = await prisma.reservation.delete({
        where: { id: input.id },
      });
      return reservation;
    }),

  getReservationById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const reservation = await prisma.reservation.findUnique({
        where: { id: input.id },
      });
      return reservation;
    }),

  getReservationsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const reservations = await prisma.reservation.findMany({
        where: { userId: input.userId },
        orderBy: { id: "asc" },
      });
      return reservations;
    }),

  getReservationsByBusinessId: publicProcedure
    .input(z.object({ businessId: z.number() }))
    .query(async ({ input }) => {
      const reservations = await prisma.reservation.findMany({
        where: { businessId: input.businessId },
        orderBy: { id: "asc" },
      });
      return reservations;
    }),
});
