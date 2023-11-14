import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/index.js";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

const users = await trpc.userList.query();
console.log(users);
const user = await trpc.userById.query("123");
console.log(user);
const createdUser = await trpc.userCreate.mutate({ name: "Jack" });
console.log(createdUser);
const nextUsers = await trpc.userList.query();
console.log(nextUsers);
