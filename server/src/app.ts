import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    return {
        req,
        res,
    };
};
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();
const router = t.router;
// const publicProcedure = t.procedure;
export const appRouter = router({
    greeting: t.procedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => `Hello ${input.name}`),
});
export type AppRouter = typeof appRouter;

export default appRouter;
