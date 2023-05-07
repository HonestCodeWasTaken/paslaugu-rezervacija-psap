import { advertisementRouter } from "./router/advertisementRouter";
import { businessRouter } from "./router/businessRouter";
import { notificationRouter } from "./router/notificationsRouter";
import { ratingRouter } from "./router/ratingRouter";
import { reservationRouter } from "./router/reservationsRouter";
import { serviceRouter } from "./router/servicesRouter";
import { router } from "./trpc";

export const appRouter = router({
  businesses: businessRouter,
  services: serviceRouter,
  reservations: reservationRouter,
  notifications: notificationRouter,
  ratings: ratingRouter,
  advertisements: advertisementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
