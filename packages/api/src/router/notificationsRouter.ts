import { z } from "zod";
import { Notification_Type, prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const notificationRouter = router({
  createNotification: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        isRead: z.boolean(),
        message: z.string(),
        type: z.nativeEnum(Notification_Type),
        timestamp: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const notification = await prisma.notification.create({
        data: {
          user_id: input.userId,
          isRead: input.isRead,
          message: input.message,
          type: input.type,
          timestamp: input.timestamp,
        },
      });
      return notification;
    }),

  updateNotification: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        updates: z.object({
          isRead: z.boolean().optional(),
          message: z.string().optional(),
          type: z.nativeEnum(Notification_Type).optional(),
          timestamp: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const notification = await prisma.notification.update({
        where: { id: input.id },
        data: input.updates,
      });
      return notification;
    }),

  deleteNotification: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const notification = await prisma.notification.delete({
        where: { id: input.id },
      });
      return notification;
    }),

  getNotificationById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const notification = await prisma.notification.findUnique({
        where: { id: input.id },
      });
      return notification;
    }),

  getNotificationsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const notifications = await prisma.notification.findMany({
        where: { user_id: input.userId },
        orderBy: { id: "asc" },
      });
      return notifications;
    }),
});
