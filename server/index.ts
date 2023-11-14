import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { db } from "./db.js";
import { publicProcedure, router } from "./trpc.js";

const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await db.user.findMany();
      return users;
    }),
  userById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.user.findOne(input);
      return user;
    }),
  userCreate: publicProcedure
    .input(z.object({
      name: z.string(),
    }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.create(input);
      return user;
    }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

export type AppRouter = typeof appRouter;
