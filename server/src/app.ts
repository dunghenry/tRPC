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
const publicProcedure = t.procedure;
const db = {
    posts: [
        {
            id: 1,
            title: 'This is a post one',
        },
        {
            id: 2,
            title: 'This is a post two',
        },
    ],
};
const postRouter = router({
    createPost: t.procedure.input(z.object({ title: z.string() })).mutation(({ input }) => {
        const post = {
            id: Math.floor(Math.random() * 10) + 2,
            title: input.title,
            ...input,
        };
        // console.log(post);
        db.posts.push(post);
        return post;
    }),
    listPosts: publicProcedure.query(() => db.posts),
});
export const appRouter = router({
    post: postRouter,
    greeting: t.procedure.input(z.object({ name: z.string() })).query(({ input }) => {
        console.log(input.name);
        return `Hello ${input.name}`;
    }),
});
export type AppRouter = typeof appRouter;

export default appRouter;
