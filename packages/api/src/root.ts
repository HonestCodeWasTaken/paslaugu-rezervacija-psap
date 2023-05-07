import { businessRouter } from "./router/businessRouter";
import { notificationRouter } from "./router/notificationsRouter";
import { reservationRouter } from "./router/reservationsRouter";
import { serviceRouter } from "./router/servicesRouter";
import { router } from "./trpc";

export const appRouter = router({
  businesses: businessRouter,
  services: serviceRouter,
  reservations: reservationRouter,
  notifications: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
