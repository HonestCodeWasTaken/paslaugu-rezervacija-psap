import { authRouter } from "./router/authRouter";
import { postRouter } from "./router/postRouter";
import { router } from "./trpc";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
