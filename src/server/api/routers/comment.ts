import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from './../trpc';

export const commentRouter = createTRPCRouter({
    addComment: protectedProcedure
        .input(z.object({ text: z.string(), postId: z.string() }))
        .mutation(({ input, ctx }) => {
            const { text, postId } = input;
            const userId = ctx.session?.user?.id;
            return ctx.prisma.comment.create({
                data: { text, userId, postId }
            })
        })
})